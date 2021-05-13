<template>
  <div class="contact">
    <v-container></v-container>
    <v-container>
      <v-alert type="success" dismissible v-if="success"
        >Successfully submited message</v-alert
      >
      <v-form>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field label="Message" v-model="message"></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="send">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Contact",
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v && v.length <= 100) || "Name must be less than 100 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      message: "",
      success: false,
    };
  },
  methods: {
    send: function () {
      const db = firebase.firestore();
      db.collection("Messages")
        .add({
          name: this.name,
          email: this.email,
          message: this.message,
          reviewed: false,
        })
        .then(() => {
          this.name = "";
          this.email = "";
          this.message = "";
          this.success = true;
        })
        .catch((err) => {
          console.error("Error has occurred when added the data: ", err);
        });
        this.success = false;
    },
  },
};
</script>
<style scoped>
.contact {
  padding-top: 50px;
}
</style>