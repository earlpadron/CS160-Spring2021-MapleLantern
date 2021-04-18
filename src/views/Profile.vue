<template>
  <div class="profile">
    <v-container>
      <v-card class="mx-auto" max-width="85%" tile>
        <v-img
          height="200"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        ></v-img>
        <v-row style="margin: 2.5%; position: absolute; top: 130px">
          <v-list-item>
            <v-list-item-avatar size="100">
              <v-avatar class="ma-md-15 mx-md-15" color="red" size="164">
                <span class="white--text headline">CJ</span>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title" style="margin-top: 10px"
                >user.name</v-list-item-title
              >
              <v-list-item-subtitle>Points: user.points</v-list-item-subtitle>
              <v-list-item-subtitle
                ><a v-on:click="doSomething">
                  Add points
                </a></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-card>
    </v-container>

    <v-app id="inspire">
      <v-main>
        <div class="text-center">
          <h1 class="font-weight-light">Cards</h1>
        </div>
        <v-sheet class="mx-auto" max-width="80%">
          <v-slide-group
            v-model="model"
            class="pa-4"
            active-class="success"
            show-arrows
          >
            <v-slide-item v-for="n in 15" :key="n">
              <div class="ma-md-4 mx-md-4">
                <activity-card />
              </div>
            </v-slide-item>
          </v-slide-group>
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
      posts: ["profile1", "dummy2", "dummy3", "dummy4"],
      model: null,
    };
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
  },
};
</script>

<style scoped>
</style>