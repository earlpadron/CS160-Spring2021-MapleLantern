<template>
  <div class="home">
    <v-container>
      <div class="text-center">
        <h1 class="font-weight-light">Activities</h1>
      </div>
    </v-container>

    <v-app id="inspire">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <!-- <v-avatar class="mr-10" color="green darken-1" size="32"
            ><span class="white--text headline">{{ initials }}</span></v-avatar
          > -->
          <v-avatar color="orange">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>

          <v-btn v-for="link in links" :key="link" text @click="leave(link)">
            {{ link }}
          </v-btn>
          <v-btn text @click="logout" v-if="this.$store.state.user.userType">
            Logout
          </v-btn>
          <v-btn text @click="login" v-if="!this.$store.state.user.userType">
            Login
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
          <v-btn text @click="search()"> Search </v-btn>
        </v-container>
      </v-app-bar>

      <v-main>
        <!-- class="orange lighten-5" "grey lighten-3"> -->
        <v-container>
          <v-row>
            <v-col cols="2">
              <div class="text-center">
                <h1 class="font-weight-light">Search Options</h1>
              </div>
              <v-btn
                elevation="2"
                @click="catFilter('All')"
                block
                color="white"
              >
                All</v-btn
              >

              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Age Group
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-sheet rounded="lg">
                      <v-list color="transparent">
                        <v-list-item v-for="n in ages" :key="n" link>
                          <v-list-item-content>
                            <v-list-item-title @click="ageFilter(n)">
                              {{ n }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Category
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
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
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>

            <v-col col>
              <v-sheet min-height="70vh" rounded="sm">
                <v-row no-gutters>
                  <!-- <v-row :align-content="start" :align="start"> -->
                  <v-col v-for="n of visiblePages" :key="n.name">
                    <activity-card
                      class="ma-md-1 mx-md-1"
                      :id="n.id"
                      :description="n.data.description"
                      :cost="n.data.cost"
                      :activityName="n.data.name"
                      :eventStart="n.data.eventDateStart"
                      :eventEnd="n.data.eventDateEnd"
                      :ageGroup="n.data.ageGroup"
                      :isActivityCard="true"
                      :address="n.data.address"
                      :categories="n.data.categories"
                      :imageUrl="n.data.imageUrl"
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
      links:
        this.$store.state.user.userType == "ServiceProvider"
          ? ["payment", "post", "profile", "contact"]
          : this.$store.state.user.userType == "Admin"
          ? ["profile"]
          : ["payment", "profile", "contact"],
      categories: [
        "Volunteering",
        "Tutoring",
        "Indoor Activity",
        "Outdoor Activity",
        "Other",
      ],
      ages: [
        "Toddlers: 0-3",
        "Kids: 4-8",
        "Pre-Teens: 9-12",
        "Adolescent: 13-18",
        "Young Adults: 19-30",
        "Adults: 31-59",
        "Senior Citizens: 60+",
        "All Ages",
      ],
      searchKeywords: "",
      res: [],
      pagination: {
        page: 1,
        perPage: 8,
      },

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
    this.$store.commit("setAllActivities", this.res);
  },

  computed: {
    visiblePages() {
      return this.res.slice(
        (this.pagination.page - 1) * this.pagination.perPage,
        this.pagination.page * this.pagination.perPage
      );
    },
    initials() {
      if (this.$store.state.user.name) {
        let name = this.$store.state.user.name.split(" ");
        return name[0][0] + name[1][0];
        // return "A";
      } else {
        return "@";
      }
    },
  },

  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
          this.$store.commit("resetState");
        });
    },
    post: function () {
      this.$router.replace("/post");
    },
    search: function () {
      const keywords = this.searchKeywords.split(/(\s+)/);

      let d = [];
      this.$store.state.allActivities.forEach((activity) => {
        if (
          (activity.data.name
            ? activity.data.name
                .split(/(\s+)/)
                .some((r) => keywords.includes(r))
            : false) ||
          (activity.data.description
            ? activity.data.description
                .split(/(\s+)/)
                .some((r) => keywords.includes(r))
            : false)
        ) {
          d.push(activity);
        }
      });
      this.res = d;
      this.$store.state.activities = d;
      this.$store.commit("setActivities", d);
    },

    catFilter: async function (n) {
      const db = firebase.firestore();
      var d = [];
      if (n == "All") {
        d = this.$store.state.allActivities;
      } else {
        await db
          .collection("Activities")
          .where("categories", "array-contains", n)
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
      this.$store.commit("setActivities", d);
    },

    ageFilter: async function (n) {
      const db = firebase.firestore();
      var d = [];
      if (n == "All") {
        d = this.$store.state.allActivities;
      } else {
        await db
          .collection("Activities")
          .where("ageGroup", "==", n)
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
      this.$store.commit("setActivities", d);
    },

    filter: function (n) {
      console.log(n);
    },
    leave: function (n) {
      this.$router.replace(`/${n}`);
    },
    login: function () {
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.activity-card {
  padding-top: 50px;
}
</style>