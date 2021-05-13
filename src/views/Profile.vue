<template>
  <div class="profile" style="overflow: hidden">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <v-alert dismissible type="info" v-if="successReset">
            Password Email Reset Sent.
          </v-alert>
           <v-alert dismissible type="error" v-if="successResetError">
      I'm an info alert.
    </v-alert>
          <v-spacer></v-spacer>
          <v-card class="mx-auto" max-width="85%">
            <v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-avatar color="orange" size="150">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                  <div class="text-center">
                    <h1 class="font-weight-light">{{ name }}</h1>
                  </div>
                  <div class="text-center">
                    <h2 class="font-weight-light">{{ userType }}</h2>
                  </div>
                  <div
                    v-if="
                      userType == 'Citizen' || userType == 'ServiceProvider'
                    "
                  >
                    <h2 class="font-weight-light">Points: {{ points }}</h2>
                  </div>
                  <v-list-item-subtitle v-if="userType == 'Citizen'"
                    ><a v-on:click="payment()">
                      <h2 class="font-weight-light">Add points</h2>
                    </a></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-row>
          </v-card>
        </v-container>
        <v-sheet class="mx-auto mt-5" max-width="80%">
          <div class="text-center">
            <h1 class="font-weight-light">Activities</h1>
          </div>
          <v-slide-group
            v-model="model"
            class="pa-2"
            active-class="success"
            show-arrows
          >
            <v-slide-item v-for="(n, index) in model" :key="index">
              <div class="ma-md-5 mx-md-15">
                <activity-card
                  class="ma-md-5 mx-md-1"
                  :description="n.data.description"
                  :cost="n.data.cost"
                  :activityName="n.data.name"
                  :eventStart="n.data.eventDateStart"
                  :eventEnd="n.data.eventDateEnd"
                  :categories="n.data.categories"
                  :ageGroup="n.data.ageGroup"
                  :isProfileCard="isCitizen"
                  :isVenderCard="isVender"
                  :isAdminCard="isAdmin"
                  :id="n.id"
                  :purchasedBy="n.data.purchasedBy"
                  :imageUrl="n.data.imageUrl"
                />
              </div>
            </v-slide-item>
          </v-slide-group>
          <div v-if="isAdmin">
            <div class="text-center">
              <h1 class="font-weight-light">User Management</h1>
            </div>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="6" md="4">
                    <v-text-field
                      v-model="userFormEmail"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <!-- :error-messages="selectErrors" -->
                  <v-col cols="6" md="4">
                    <v-select
                      v-model="user_type"
                      :items="userTypes"
                      label="User Type"
                      required
                      @change="$v.select.$touch()"
                      @blur="$v.select.$touch()"
                    >
                    </v-select>
                  </v-col>

                  <!-- :error-messages="selectErrors" -->
                  <v-col cols="6" md="4">
                    <v-select
                      v-model="userAction"
                      :items="userActions"
                      label="User Type"
                      required
                      @change="$v.select.$touch()"
                      @blur="$v.select.$touch()"
                    ></v-select>
                  </v-col>

                  <v-col cols="6" md="4">
                    <v-btn class="mr-4" type="submit" @click="manageUser"
                      >Submit</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </v-sheet>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
import ActivityCard from "../components/ActivityCard.vue";

export default {
  name: "profile",
  components: { ActivityCard },
  data() {
    return {
      model: null,
      userType: this.$store.state.user.userType,
      isCitizen: false,
      isVender: false,
      isAdmin: false,
      name: this.$store.state.user.name,
      points: this.$store.state.user.points,
      userFormEmail: "",
      userTypes: ["Citizen", "ServiceProvider"],
      user_type: "",
      userActions: ["Locked", "Create", "Delete", "Reset Password"],
      userAction: "",
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      successReset:false,
      successResetError:false,
    };
  },
  computed: {
    initials() {
      let name = this.$store.state.user.name.split(" ");
      return name[0][0] + name[1][0];
    },
  },

  created() {
    console.log(this.$store.state);
    this.getCardsData();
  },

  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    post: function () {
      this.$router.replace("/post");
    },
    getCardsData: async function () {
      const db = firebase.firestore();
      const d = [];
      if (this.$store.state.user.userType == "Citizen") {
        this.isCitizen = true;
        let purchasedIDs;
        await db
          .collection("Citizens")
          .where("email", "==", this.$store.state.user.email)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              purchasedIDs = doc.data().purchased.map((res) => {
                return res.activity.id;
              });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });

        for (const id of purchasedIDs) {
          await db
            .collection("Activities")
            // .doc(id)
            .where(firebase.firestore.FieldPath.documentId(), "==", id)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                d.push({ id: doc.id, data: doc.data() });
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
      } else if (this.$store.state.user.userType == "ServiceProvider") {
        this.isVender = true;
        let docID = "";
        let userData = {
          name: "",
          points: "",
        };
        await db
          .collection("ServiceProviders")
          .where("email", "==", this.$store.state.user.email)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              docID = doc.id;
              userData.name = doc.data().name;
              userData.points = doc.data().points;
            });
          });

        const vendor = "/ServiceProviders/" + docID;
        this.$store.state.user.name = userData.name;
        this.$store.commit("setName", userData.name);
        this.$store.state.user.points = userData.points;
        this.$store.commit("setPoints", userData.points);
        this.name = this.$store.state.user.name;
        this.points = this.$store.state.user.points = userData.points;

        await db
          .collection("Activities")
          .where("provider", "==", vendor)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, " => ", doc.data());
              d.push({ id: doc.id, data: doc.data() });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      } else if (this.$store.state.user.userType == "Admin") {
        this.isAdmin = true;
        await db
          .collection("Activities")
          .where("approved", "==", false)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              d.push({ id: doc.id, data: doc.data() });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }

      this.$store.activities = d;
      this.model = this.$store.activities;
    },

    payment: function () {
      this.$router.replace("/addpoints");
    },

    resetPassword: function () {
      const auth = firebase.auth();
      auth
        .sendPasswordResetEmail(this.userFormEmail)
        .then(() => {
          this.successReset = true;
        })
        .catch((error) => {
          this.successResetError = true;
        });
      this.successReset = false;
      this.successResetError = false;
    },

    manageUser: async function () {
      const db = firebase.firestore();

      if (this.userAction == "Locked") {
        await db
          .collection(this.user_type + "s")
          .where("email", "==", this.userFormEmail)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log({ id: doc.id, data: doc.data() });
              doc.ref.update({
                locked: true,
              });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      } else if (this.userAction == "Create") {
        this.$router.replace("/sign-up");
      } else if (this.userAction == "Delete") {
        await db
          .collection(this.user_type + "s")
          .where("email", "==", this.userFormEmail)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log({ id: doc.id, data: doc.data() });
              doc.ref.delete();
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      } else if (this.userAction == "Reset Password") {
        this.resetPassword();
      }
    },
  },
};
</script>

<style scoped>
.v-list-item__content {
  justify-content: center;
  text-align: center;
  display: grid;
}
</style>