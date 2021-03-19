<template>
  <div class="login">
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
            v-model="email"
            :rules="emailRules"
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
            @click="login()"
          >
            Login
          </v-btn>

          <p> Don't have an account? You can <router-link to='/sign-up'> create one</router-link>.</p>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
import CryptoJS from 'crypto-js'

export default {
  name: 'login',

  data() {
    return {
      email:"",
      password:"",
      pvisvalue: String
    };
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
            this.$router.push('/home')
            alert('You are now connected!')
        })
        .catch((error) => {
          alert(error.message);
        });

      this.$store.state.email = this.email;
      console.log(this.$store.state.email);

    },
    getUserEmail: function() {
      return this.email;
    }
  }
}

</script>

<style scoped>
  .login {
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
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>