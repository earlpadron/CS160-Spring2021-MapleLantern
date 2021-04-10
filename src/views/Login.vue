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
            :rules="[rules.required, rules.email]"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.counter]"
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

export default {
  mane: 'login',
  data() {
    return {
      valid: true,
      email:"",
      password:"",
      pvisvalue: String,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
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