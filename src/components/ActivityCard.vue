<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title> {{ activityName }} </v-card-title>

    <v-card-subtitle> {{ cost }} points </v-card-subtitle>
    <v-card-subtitle> {{ categories }} </v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="show = !show">
        Explore
      </v-btn>
      <v-btn color="orange lighten-2" text @click="purchase()">
        Purchase
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text> {{ description }} </v-card-text>
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
    };
  },
  props: {
    activityName: String,
    cost: Number,
    vender: String,
    description: String,
    categories: [],
    eventStart: Date,
    eventEnd: Date,
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
