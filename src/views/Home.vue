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

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
          >
            mdi-information
          </v-icon>
        </template>
        <span>Points are an in-app currency used to purchase activities. Click here<br/>
              to purchase points. When registering, the activity cost will automatically be <br/>
              deducted from that user’s total points.
        </span>
      </v-tooltip>

    </v-container>

    <v-container>
      <v-btn color="success" class="mr-4" @click="post()">
        Create A Post
      </v-btn>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
          >
            mdi-information
          </v-icon>
        </template>
        <span>Have an activity you want to share? Click here to set <br/> 
              up and create a post <br/> 
        </span>
      </v-tooltip>
      <div class="text-center">
        <h1 class="font-weight-light">Maple Lantern</h1>
      </div>
    </v-container>

    <v-app id="inspire">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <v-avatar class="mr-10" color="green darken-1" size="32"
            ><span class="white--text headline">{{ initials }}</span></v-avatar
          >

          <v-btn v-for="link in links" :key="link" text @click="leave(link)">
            {{ link }}
          </v-btn>
          <v-btn text @click="logout"> Logout </v-btn>

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
          <v-btn text @click="search()"> Search </v-btn>
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
                      class="ma-md-1 mx-md-1"
                      :id="n.id"
                      :description="n.data.description"
                      :cost="n.data.cost"
                      :activityName="n.data.name"
                      :eventStart="n.data.eventDateStart"
                      :eventEnd="n.data.eventDateEnd"
                      :categories="n.data.category"
                      :isActivityCard="true"
                      :address="n.data.address"
                    />
                  </v-col>
                </v-row>
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
      links: ["payment", "post", "profile", "settings"],
      categories: [
        "Volunteering",
        "Tutoring",
        "Indoor Activity",
        "Outdoor Activity",
        "Other",
        "All",
      ],
      searchKeywords: "",
      res: [],
      pagination: {
        page: 1,
        perPage: 8,
      },
      name: this.$store.state.user.name,
    };
  },
  async created() {
    const db = firebase.firestore();
    const d = [];
    await db
      .collection("Activities")
      .where("adminApproved", "==", true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          d.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    this.res = d;
    this.$store.state.allActivities = this.res;
  },

  computed: {
    visiblePages() {
      return this.res.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
    initials() {
      let name = this.$store.state.user.name.split(" ");
      return name[0][0] + name[1][0];
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
    search: function () {
      const keywords = this.searchKeywords.split(/(\s+)/);

      let d = [];
      this.$store.state.allActivities.forEach(activity => {
        if((activity.data.name? activity.data.name.split(/(\s+)/).some(r=> keywords.includes(r)): false) || 
          (activity.data.description? activity.data.description.split(/(\s+)/).some(r=> keywords.includes(r)): false)){
            d.push(activity);
          }
      });
      this.res = d;
      this.$store.state.activities = d;
    },

    catFilter: async function (n) {
      const db = firebase.firestore();
      const d = [];
      if (n == "All") {
        await db
          .collection("Activities")
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              d.push({ id: doc.id, data: doc.data() });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      } else {
        await db
          .collection("Activities")
          .where("category", "array-contains", n)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              d.push({ id: doc.id, data: doc.data() });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }
      this.res = d;
      this.$store.state.activities = d;
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