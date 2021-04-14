<template>
  <div class="home">
    <v-container>
      <h3>HOME</h3>
      <button @click="logout">Log out</button>
    </v-container>

    <v-container>
      <v-btn color="success" class="mr-4" @click="payment()">
        Add/Edit Payment Details
      </v-btn>
    </v-container>

    <v-container>
      <v-btn color="success" class="mr-4" @click="post()">
        Create A Post
      </v-btn>
    </v-container>

    <v-app id="inspire">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

          <v-btn v-for="link in links" :key="link" text @click="leave(link)">
            {{ link }}
          </v-btn>

          <v-spacer></v-spacer>

          <!-- TODO: add on enter to start the search -->
          <v-responsive max-width="260">
            <v-text-field
              v-model="searchKeywords"
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>

      <v-main class="grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <div class="text-center">
                <h1 class="font-weight-light">Categories</h1>
              </div>
              <v-sheet rounded="lg">
                <v-list color="transparent">
                  <v-list-item v-for="n in categories" :key="n" link>
                    <v-list-item-content>
                      <v-list-item-title @click="catFilter(n)">
                        {{ n }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col col>
              <v-sheet min-height="70vh" rounded="lg">
                <v-row no-gutters>
                  <v-col v-for="n of visiblePages" :key="n.name">
                    <activity-card
                      class="ma-md-5 mx-md-5"
                      :description="n.data.description"
                      :cost="n.data.cost"
                      :activityName="n.data.name"
                      :eventStart="n.data.eventDateStart"
                      :eventEnd="n.data.eventDateEnd"
                      :categories="n.data.category"
                    />
                  </v-col>
                </v-row>
                <!-- <v-list color="transparent">
                  <v-list-item v-for="n of res" :key="n.name">
                    <v-list-item-content>
                      <activity-card
                        :description="n.data.description"
                        :cost="n.data.cost"
                        :activityName="n.data.name"
                        :eventStart="n.data.eventDateStart"
                        :eventEnd="n.data.eventDateEnd"
                        :categories="n.data.category"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->
              </v-sheet>
              <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(res.length / pagination.perPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
import ActivityCard from "../components/ActivityCard.vue";

export default {
  components: { ActivityCard },
  name: "home",

  data() {
    return {
      links: ["browse", "schedule", "profile", "settings"],
      categories: [
        "Volunteering",
        "Tutoring",
        "Indoor Activity",
        "Outdoor Activity",
        "Other",
      ],
      searchKeywords: "",
      res: [],
      pagination: {
        page: 1,
        perPage: 6,
      },
    };
  },
  async created() {
    const db = firebase.firestore();
    const d = [];
    await db
      .collection("Activities")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          d.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    this.res = d;
  },

  computed: {
    visiblePages() {
      return this.res.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
  },

  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
          alert("You are signed out");
        });
    },
    post: function () {
      this.$router.replace("/post");
      alert("Redirecting to post creation page");
    },
    search: async function () {
      const db = firebase.firestore();
      const keywords = this.search.split(/(\s+)/);
      let fromName = db
        .collection("Activities")
        .whereContains("name", keywords);
      let fromDesc = db
        .collection("Activities")
        .whereContains("description", keywords);
      let fromCat = db
        .collection("Activities")
        .where("category", "array-contains-any", keywords);

      const [nameRes, descRes, catRes] = await Promise.all([
        fromName,
        fromDesc,
        fromCat,
      ])
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      const allRes = nameRes.concat(descRes).concat(catRes);
    },

    catFilter: async function (n) {
      const db = firebase.firestore();
      const d = [];
      await db
        .collection("Activities")
        .where("category", "array-contains", n)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ id: doc.id, data: doc.data() });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      this.res = d;
    },
    payment: function () {
      this.$router.replace("/payment");
      alert("Redirecting to payment details page");
    },
    filter: function (n) {
      console.log(n);
    },
    leave: function (n) {
      this.$router.replace(`/${n}`);
      alert(`Redirecting to ${n} page`);
    },
  },
};
</script>

<style scoped>
.activity-card {
  padding-top: 50px;
}
</style>