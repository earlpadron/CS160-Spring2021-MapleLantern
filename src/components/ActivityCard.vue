<template>
  <div>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      You currently do not have sufficient points to purchase this activity.
      Please purchase more points first
      <template v-slot:action="{ attrs }">
        <v-btn color="orange" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-alert type="success" dismissible v-if="success"
        >Successfully purchased this activity!</v-alert
      >

  <v-card class="mx-auto" max-width="344">
    <v-img
      :src= imageUrl
      height="200px"
      @click="getImageUrl()"
    ></v-img>

      <v-card-title> {{ activityName }} </v-card-title>
      <v-card-text> Cost:{{ cost }} points </v-card-text>
      <v-card-text> Categories: {{ categories.join(", ") }}</v-card-text>
      <v-card-text> Age Group: {{ ageGroup }} </v-card-text>
      <v-card-text> Event Date: {{ eventStart }} - {{ eventEnd }} </v-card-text>
      <v-card-text v-if="isVenderCard">
        Purchased By: {{ purchasedBy }}
      </v-card-text>

      <v-card-actions v-if="isActivityCard">
        <v-btn color="orange lighten-2" text @click="show = !show">
          Details
        </v-btn>
        <v-btn color="orange lighten-2" text @click="purchase()">
          Purchase
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-actions v-if="isProfileCard">
        <v-btn color="orange lighten-2" text @click="show = !show">
          Details
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-actions v-if="isVenderCard">
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-actions v-if="isAdminCard">
        <v-btn color="green lighten-2" text @click="approve()"> Approve </v-btn>
        <v-btn color="red lighten-2" text @click="deny()"> Deny </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text> {{ description }} </v-card-text>

          <router-link
            :to="{
              name: 'MapView',
              params: { destination: location, propPlace: origin },
            }"
          >
            <v-btn class="ma-5">Location</v-btn>
          </router-link>
          <!-- </v-btn> -->
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>



<script>
import firebase from "firebase";
export default {
  name: "ActivityCard",
  data() {
    return {
      show: false,
      user: this.$store.state.user.email,
      userType: this.$store.state.user.userType,
      name: this.$store.state.user.name,
      points: this.$store.state.user.points,
      docID: this.$store.state.user.docID,
      //set address to actual event address
      location: "200 S Mathilda Ave, Sunnyvale, CA",
      origin: null,
      multiLine: true,
      snackbar: false,
      success: false
    };
  },
  mounted() {
    // console.log({ router: this.$router });
    this.getLocation();
  },
  props: {
    activityName: String,
    cost: Number,
    vender: String,
    description: String,
    categories: Array,
    ageGroup: String,
    eventStart: String,
    eventEnd: String,
    isActivityCard: Boolean,
    isProfileCard: Boolean,
    isVenderCard: Boolean,
    isAdminCard: Boolean,
    address: String,
    id: String,
    purchasedBy: Number,
    imageUrl: String,
  },
  methods: {
    leave: function () {
      this.$router.replace("/login");
    },
    purchase: async function () {
      if(this.user == ''){
        this.$router.replace("/login");
      }

      const db = firebase.firestore();
      const data = await db
        .collection("Activities")
        .where("name", "==", this.activityName)
        .get();
      const activityDocID = data.docs[0].id;
      const activityRef = "/Activities/" + activityDocID;

      let prov = "";
      await db
        .collection("Activities")
        .where("name", "==", this.activityName)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              prov = doc.data().provider;
            });
          });
      console.log(prov);

      if (this.points >= this.cost) {
        var adding = {
          activity: db.doc("/Activities/" + activityDocID),
          datePurchased: Date.now(),
        };
        db.collection("Citizens")
          .doc(this.docID)
          .update({
            points: this.points - this.cost,
            purchased: firebase.firestore.FieldValue.arrayUnion(adding),
          });
        this.$store.state.user.points = this.points - this.cost;
        this.$store.commit("setPoints", this.points - this.cost);

        var providerRef = db.doc(prov);
        // Atomically increment the provider's points by cost.
        providerRef.update({
            points: firebase.firestore.FieldValue.increment(this.cost)
        });
        this.success = true;
      } else {
        this.snackbar = true;
      }
    },
    approve: async function () {
      console.log(this.$props.id);
      const db = firebase.firestore();

      await db
        .collection("Activities")
        .doc(this.$props.id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            doc.ref.update({
              approved: true,
              adminApproved: true,
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
    deny: async function () {
      const db = firebase.firestore();
      await db
        .collection("Activities")
        .doc(this.$props.id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            doc.ref.update({
              approved: true,
              adminApproved: false,
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
    getLocation: function () {
      if (!("geolocation" in navigator)) {
        console.log("Geolocation is not available.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // console.log("position: ", pos.coords)
            this.origin = pos.coords;
          },
          (err) => {
            console.log("error: ", err.message);
          }
        );
      }
      if (this.address != null) {
        this.location = this.address;
      }
    },
    getImageUrl: function() {
      console.log("imageUrl: ", this.imageUrl)
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
