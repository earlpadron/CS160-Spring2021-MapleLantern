<template>
  <div class="payment">
    <v-container></v-container>
    <v-container></v-container>
    <v-container></v-container>

    <v-container>
      <v-alert type="success" dismissible v-if="success"
        >Payment Information saved successfully</v-alert
      >
      <v-alert type="error" dismissible v-if="error"
        >Error saving payment info</v-alert
      >
      <v-card class="mx-auto" max-width="800">
        <v-form class="pa-5" ref="form" v-model="valid" lazy-validation>
          <h1>Add/Edit Payment Details</h1>

          <v-text-field v-model="Email" label="Email" required></v-text-field>

          <v-overflow-btn
            v-model="PaymentMethod"
            :items="items"
            item-text="PaymentMethod"
            label="Select a Payment Method"
            single-line
            required
          ></v-overflow-btn>

          <v-text-field
            v-model="CardNumber"
            label="Enter Credit Card Number"
            required
          ></v-text-field>

          <v-text-field
            v-model="ExpiryDate"
            label="Enter the Expiry Date (MM/YYYY)"
            required
          ></v-text-field>

          <v-text-field
            v-model="CVVCode"
            label="Enter CVV Code"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="SaveInfo()"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import firebaseApp from "../main";

var firebaseConfig = {
  apiKey: "AIzaSyBWNxiMk60f4Wj-OjJnOshI7fhPAcmPxIE",
  authDomain: "maplelatern.firebaseapp.com",
  projectId: "maplelatern",
  storageBucket: "maplelatern.appspot.com",
  messagingSenderId: "170566555092",
  appId: "1:170566555092:web:bfdf6e9e29589b16a7f241",
  measurementId: "G-LRBSXKYS6E",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore().collection("/PaymentInfo");

export default {
  name: "payment",
  data() {
    return {
      Email: null,
      PaymentMethod: null,
      CardNumber: null,
      ExpiryDate: null,
      CVVCode: null,
      items: [
        { PaymentMethod: "Mastercard" },
        { PaymentMethod: "Visa" },
        { PaymentMethod: "PayPal" },
      ],
      success: false,
      error: false,
    };
  },
  methods: {
    SaveInfo() {
      db.doc(this.Email)
        .set({
          Email: this.Email,
          PaymentMethod: this.PaymentMethod,
          CardNumber: this.CardNumber,
          ExpiryDate: this.ExpiryDate,
          CVVCode: this.CVVCode,
        })
        .then(function (docRef) {
          console.log(this);
          this.success = true;
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
          this.error = true;
        });
      this.success = false;
      this.error = false;
    },
    back() {
      this.$router.replace("/home");
      alert("Redirecting to home page");
    },
  },
};
</script>