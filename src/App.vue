<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="light green"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="mr-2"
          contain
          src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/blue-maple-leaves-colin-drysdale.jpg"
          transition="scale-transition"
          width="60"
        />
        <router-link to='/home'>
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1"
            contain
            min-width="100"
            :src="require('./assets/Title.png')"
            width="100"
            to='/home'
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar> -->
    <v-app-bar app color="white">
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links" :key="link" text @click="leave(link)">
          {{ link }}
        </v-btn>
        <v-btn text @click="logout"> Logout </v-btn>

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
export default {
  name: "App",

  data: () => ({
    links: ["home", "post", "profile", "settings"],
  }),
  methods: {
    leave: function (n) {
      this.$router.replace(`/${n}`);
      alert(`Redirecting to ${n} page`);
    },
  },
};
</script>
