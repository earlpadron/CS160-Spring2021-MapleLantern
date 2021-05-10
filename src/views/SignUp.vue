<template>
  <div class="sign-up">
    <v-container></v-container>
    <v-container></v-container>
    <v-container>
      <v-card class="mx-auto" max-width="500">
        <v-form class="pa-5" ref="form" lazy-validation>
          <v-text-field
            v-model="name"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="pvisvalue ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (pvisvalue = !pvisvalue)"
            :type="pvisvalue ? 'password' : 'text'"
            required
          ></v-text-field>

          <v-container fluid>
            <v-row align="center">
              <v-col class="d-flex" cols="15">
                <v-select
                  :items="userTypes"
                  label="Account type"
                  v-model="userType"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          
          <v-container fluid>
            <v-btn
              color="success"
              class="mr-4"
              @click="signUp()"
            >
              Sign-up
            </v-btn>
          </v-container>

          <p>Head back to <router-link to="/login"> login</router-link>.</p>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      pvisvalue: String,
      userType: "",
      userTypes: ["Citizen", "Service Provider"],
    };
  },
  methods: {
    // Added users to their appropriate collections
    addUser: function (name, email, type) {
      const db = firebase.firestore();
      if (type == "Citizen") {
        db.collection("Citizens")
          .add({
            email: email,
            name: name,
            points: 0,
            purchased: [],
            locked: false,
          })
          .then(() => {
            console.log("Document added successfully!");
          })
          .catch((err) => {
            console.error("Error creating new citizen document: ", err);
          });
      }
      if (type == "Service Provider") {
        db.collection("ServiceProviders")
          .add({
            email: email,
            name: name,
            points: 0,
            listed: [],
          })
          .then(() => {
            console.log("Document added successfully!");
          })
          .catch((err) => {
            console.error("Error creating new service provider document: ", err);
          });
      }
    },

    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.addUser(this.name, this.email, this.userType);
          this.$router.push("/home");
          alert("Your account has been created!");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
.signUp {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>