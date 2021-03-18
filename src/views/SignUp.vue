<template>
  <div class="sign-up">
    <v-container></v-container>
    <v-container></v-container>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-form
        class="pa-5"
        ref="form"
        v-model="valid"
        lazy-validation
        >
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
            :rules="passwordRules"
            label="Password"
            :append-icon="pvisvalue ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (pvisvalue = !pvisvalue)"
            :type="pvisvalue ? 'password' : 'text'"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="signUp()"
          >
            Sign-up
          </v-btn>

          <p> Head back to <router-link to='/login'> login</router-link>.</p>
        </v-form>
      </v-card>
    </v-container>
  </div>
  
</template>

<script>

import firebase from 'firebase/app';
// import firebase from 'firebase/';

// import CryptoJS from 'crypto-js
// const db = firebase.firestore();

export default {
  mane: 'signUp',
  data() {
    return {
      email: "",
      password:"",
      name:"",
      pvisvalue: String
    };
  },
  methods: {
    createUser: function(email, name) {
      
    },
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
            this.$router.push('/home')
            alert('Your account has been created!')
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
}
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