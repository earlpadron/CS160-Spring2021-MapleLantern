<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title> {{ activityName }} </v-card-title>

    <v-card-subtitle> {{ cost }} points </v-card-subtitle>
    <v-card-subtitle> {{ categories }} </v-card-subtitle>
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
      <v-btn color="green lighten-2" text>
        Approve
      </v-btn>
      <v-btn color="red lighten-2" text>
        Deny
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text> {{ description }} </v-card-text>
        
          <router-link :to="{ name: 'MapView', params: { query2: address }}">
            <v-btn class="ma-5">Location</v-btn>
          </router-link>
        <!-- </v-btn> -->
      </div>
    </v-expand-transition>
  </v-card>
</template>



<script>
export default {
  name: "ActivityCard",
  data() {
    return {
      show: false,
      //set address to actual event address 
      location: "200 S Mathilda Ave, Sunnyvale, CA",
    };
  },
  props: {
    activityName: String,
    cost: Number,
    vender: String,
    description: String,
    categories: [],
    eventStart: String,
    eventEnd: String,
    isActivityCard: Boolean,
    isProfileCard: Boolean,
    isVenderCard: Boolean,
    isAdminCard: Boolean,
    address: String,
  },
  methods: {
    purchase: function () {},
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
