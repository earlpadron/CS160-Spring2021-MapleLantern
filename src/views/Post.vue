<template>
  <div class="login">
    <v-container></v-container>
    <v-container></v-container>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="800"
      >
        <v-form
        class="pa-5"
        ref="form"
        v-model="valid"
        lazy-validation
        >
          
          <v-text-field
            v-model="Name"
            label="Name"
            required
          ></v-text-field>

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


                <v-text-field
                label="To Date"
                readonly
                :value="fromDateDisp"
                v-on="on"
                ></v-text-field>

            </template>

            <v-date-picker
                locale="en-in"
                :min="minDate"
                :max="maxDate"
                v-model="fromDateVal"
                no-title
                @input="fromDateMenu = false"
            ></v-date-picker>
            </v-menu>
        </v-layout>

          <v-text-field
            v-model="AgeGroup"
            label="Age Group"
            required
          ></v-text-field>

          <v-textarea
            v-model="Description"
            label="Description"
            required
          ></v-textarea>

          <v-file-input
            v-model="Upload"
            label="Upload an image"
            required
          ></v-file-input>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="post()"
          >
            Post
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import Login from './Login.vue';

  export default {
    data() {
      return {
        fromDateMenu: false,
        fromDateVal: null,

        minDate: "2019-07-04",
        maxDate: "2019-08-30",
      };
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
        // format date, apply validations, etc. Example below.
        // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
      },
    },
    methods: {
      post: async function(){
        const db = firebase.firestore();
        const email = this.$store._modules.root.state.email;
        console.log(email);

        const data = await db.collection('ServiceProviders').where("email", "==", 'aaaaa@mail.com').get();
        const docIF = data.docs[0].id;
        console.log(docIF);
        const user = "/ServiceProivders/"+docIF;

        // db.collection('Activities').add({
        //   ageGroup:"",
        //   approved: false,
        //   category: [],
        //   cost:0,
        //   datePosted:,
        //   eventDate:,
        //   name:"",
        //   provider: user
        // }). then(() => {
        //   console.log('Successfully added the activity');
        // }).catch((err) => {
        //   console.error('Error has occurred when added the data: ', err)
        // });

      }
    }
  };
</script>