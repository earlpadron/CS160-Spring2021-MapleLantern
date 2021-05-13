<template>
  <div class="login">
    <v-container></v-container>
    <v-container></v-container>
    <v-container>
      <v-alert type="success" dismissible v-if="success"
        >Successfully submited an event</v-alert
      >
      <v-card class="mx-auto" max-width="800">
        <v-form class="pa-5" ref="form">
          <!-- v-model="valid" lazy-validation> -->
          <v-text-field v-model="Name" label="Name" required></v-text-field>

          <v-layout column wrap>
            <v-menu
              v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
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
              transition="scale-transition"
              offset-y
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

          <v-overflow-btn
            v-model="AgeGroup"
            :items="ages"
            item-text="ages"
            label="Select an Age Group"
            single-line
            required
          ></v-overflow-btn>

          <v-select
            v-model="cats"
            :items="categories"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            multiple
            hint="Activity categories"
            persistent-hint
          ></v-select>

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

          <v-btn raised @click="onPickFile"> Upload Image </v-btn>
          <input 
            type="file" 
            style="display: none" 
            ref="fileInput" 
            accept="image/*"
            @change="onFilePicked">

          <v-file-input
            v-model="Upload"
            label="Upload an image"
            required
          ></v-file-input>

          <v-flex xs12 sm6 offset-sm3>
            <img :src="imageUrl" height="150">
          </v-flex>


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

      ages: [
        { ages: "Toddlers: 0-3" },
        { ages: "Kids: 4-8" },
        { ages: "Pre-Teens: 9-12" },
        { ages: "Adolescent: 13-18" },
        { ages: "Young Adults: 19-30" },
        { ages: "Adults: 31-59" },
        { ages: "Senior Citizens: 60+" },
        { ages: "All Ages" },
      ],

      categories: [
        "Volunteering",
        "Tutoring",
        "Indoor Activity",
        "Outdoor Activity",
        "Other",
      ],
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
      cats: [],
      success: false,
      imageUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      filename: "",
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
      const user = "/ServiceProviders/" + docID;

      let key;
      db.collection("Activities")
        .add({
          ageGroup: this.AgeGroup,
          approved: false,
          adminApproved: false,
          categories: this.cats,
          cost: this.cost,
          datePosted: new Date(),
          eventDateEnd: this.toDateVal,
          eventDateStart: this.fromDateVal,
          name: this.Name,
          provider: user,
          address: this.Location,
          description: this.Description,
          purchasedBy: 0,
          // image: this.Upload,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          key = docRef.id
          return key
        })
        .then(key => {
          // console.log("Document written with ID: ", key);
          const ext = this.filename.slice(this.filename.lastIndexOf('.'))
          console.log("ext: ", ext);
          return firebase.storage().ref('postImages/' + key + ext).put(this.Upload)
        })
        .then(boob => {
          const ext = this.filename.slice(this.filename.lastIndexOf('.'))
          return firebase.storage().ref().child('postImages/' + key + ext).getDownloadURL()
        })
        .then(fileData => {
          // const ext = this.filename.slice(this.filename.lastIndexOf('.'))
          this.imageUrl = fileData//firebase.storage().ref().child('postImages/' + key + ext).getDownloadURL() //fileData.metadata.getDownloadURL()
          console.log("firebase.storage().ref().child('postImages/' + key + ext): ", fileData);
          
          // downloadURLs[0]
          console.log("this.imageUrl: ", this.imageUrl);
          return db.collection("Activities").doc(key).update({imageUrl: this.imageUrl})
        })
        .then(() => {
          this.fromDateVal = null;
          this.toDateVal = null;
          this.AgeGroup = null;
          this.Name = "";
          this.Description = "";
          this.cost = 0;
          this.Upload = null;
          this.Location = "";
          this.cats = [];
          this.success = true;
        })
        .catch((err) => {
          console.error("Error has occurred when added the data: ", err);
        });
      this.success = false;
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      this.filename = files[0].name
      if (this.filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.Upload = files[0]
    }
  },
};
</script>