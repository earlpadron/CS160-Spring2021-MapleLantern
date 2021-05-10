<template>
  <v-app
    <v-app-bar app color="white">
      <v-container class="py-0 fill-height">
        <div v-if="loggedIn">
        <v-btn v-for="link in links" :key="link" text @click="leave(link)" >
          {{ link }}
        </v-btn>
        <v-btn text @click="logout"> Logout </v-btn>
        </div>
        <div v-else @click="leave('home')">
          <h2 class="font-weight-light" id="name" text>Maple Lantern</h2>
        </div>
        <v-spacer></v-spacer>
      </v-container>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",

  data: () => ({
    links: ["home", "post", "profile", "settings"],
    loggedIn: false,
  }),

  watch: {
    loggedIn: function(){
      var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        this.loggedIn = true;
      }
    }

    //  else {
    //   // No user is signed in.
    // }
  },
  methods: {
    leave: function (n) {
      this.$router.replace(`/${n}`);
      alert(`Redirecting to ${n} page`);
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
          alert("You are signed out");
        });
    },
  },
};
</script>
<style scoped>
#name{
  color:orange
}
</style>
