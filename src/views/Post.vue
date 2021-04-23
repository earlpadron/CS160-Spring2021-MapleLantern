<template>
  <div class="login">
    <v-container></v-container>
    <v-container></v-container>
    <v-container>
      <v-card class="mx-auto" max-width="800">
        <v-form class="pa-5" ref="form">
          <!-- v-model="valid" lazy-validation> -->
          <v-text-field v-model="Name" label="Name" required></v-text-field>

          <v-layout column wrap>
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="From Date"
                  readonly
                  :value="fromDateDisp"
                  v-on="on"
                ></v-text-field>
              </template>
              <!-- TODO: change datapicker to add a time as well
use this package: https://stackoverflow.com/questions/58228404/implement-datetimepicker-to-vuetify
 -->
              <v-date-picker
                locale="en-in"
                :min="minDate"
                :max="maxDate"
                v-model="fromDateVal"
                no-title
                @input="fromDateMenu = false"
              ></v-date-picker>
            </v-menu>

            <v-menu
              v-model="toDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="To Date"
                  readonly
                  :value="toDateDisp"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                locale="en-in"
                :min="minDate"
                :max="maxDate"
                v-model="toDateVal"
                no-title
                @input="fromDateMenu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-layout>

          <v-text-field
            v-model="AgeGroup"
            label="Age Group"
            required
          ></v-text-field>

          <v-text-field
            v-model="Location"
            label="Location"
            required
          ></v-text-field>

          <v-textarea
            v-model="Description"
            label="Description"
            required
          ></v-textarea>

          <p>Cost: {{ cost }}</p>
          <v-text-field
            class="inputField input-name p-3 styled-input"
            v-model.number="cost"
            hide-details
            type="number"
          />

          <v-file-input
            v-model="Upload"
            label="Upload an image"
            required
          ></v-file-input>

          <v-btn color="success" class="mr-4" @click="post()">
            <!-- :disabled="!valid" -->
            Post
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      fromDateMenu: false,
      toDateMenu: false,

      minDate: "2020-07-04",
      maxDate: "2030-08-30",
      //values from the calendar
      fromDateVal: null,
      toDateVal: null,
      AgeGroup: null,
      Name: "",
      Description: "",
      cost: 0,
      Upload: null,
      Location: "",
    };
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
    toDateDisp() {
      return this.toDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
  },
  methods: {
    post: async function () {
      const db = firebase.firestore();
      // const email = this.$store.state.user.email; //this.$store._modules.root.state.email;

      const data = await db
        .collection("ServiceProviders")
        .where("email", "==", this.$store.state.user.email)
        .get();
      const docID = data.docs[0].id;
      const user = "/ServiceProivders/" + docID;

      db.collection("Activities")
        .add({
          ageGroup: this.AgeGroup,
          approved: false,
          adminApproved: false,
          category: [],
          cost: this.cost,
          datePosted: new Date(),
          eventDateEnd: this.toDateVal,
          eventDateStart: this.fromDateVal,
          name: this.Name,
          provider: user,
          address: this.Location,
        })
        .then(() => {
          console.log("Successfully added the activity");
        })
        .catch((err) => {
          console.error("Error has occurred when added the data: ", err);
        });
    },
  },
};
</script>