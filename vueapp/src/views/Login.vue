<template>
  <div class="login">
    <h3>Log in</h3>
    <!-- <form id='login-form' v-on:submit.prevent='auth' -->
    <input type='text' placeholder="Email" v-model="email"><br>
    <input type='text' placeholder="Password" v-model="password"><br>
    <button @click="login">Submit</button>
    <p> Don't have an account? You can <router-link to='/sign-up'> create one</router-link>.</p>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  mane: 'login',
  data() {
    return {
      email:"",
      password:""
    };
  },
  methods: {
    login: function() {
      this.$router.replace('/home');
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function(data) {
          alert('You are now connected!');
        },
        function(err) {
          alert('There has been an error in logging you in. ' + err.message);
        }
      )
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