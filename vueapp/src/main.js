import Vue from 'vue'
import App from './App.vue'

import router from './router'
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth"
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWNxiMk60f4Wj-OjJnOshI7fhPAcmPxIE",
  authDomain: "maplelatern.firebaseapp.com",
  projectId: "maplelatern",
  storageBucket: "maplelatern.appspot.com",
  messagingSenderId: "170566555092",
  appId: "1:170566555092:web:bfdf6e9e29589b16a7f241",
  measurementId: "G-LRBSXKYS6E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  el: "#app",
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
