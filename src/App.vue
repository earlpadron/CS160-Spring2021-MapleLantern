<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
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
            width="240"
            to='/home'
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
