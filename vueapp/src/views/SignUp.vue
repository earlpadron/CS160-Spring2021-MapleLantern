<template>
  <div class="sign-up">
    <h3>Sign Up</h3>
    <!-- <form id='login-form' v-on:submit.prevent='auth' -->
    <input type='text' placeholder="Email" v-model="email"><br>
    <input type='text' placeholder="Password" v-model="password"><br>
    <button @click="signUp">Sign Up</button>
    <span>Head back to <router-link to='/login'>login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  mane: 'signUp',
  data() {
    return {
      email: "",
      password:""
    };
  },
  methods: {
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