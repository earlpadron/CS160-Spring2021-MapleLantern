import Vue from 'vue'
import App from './App.vue'

import router from './router'
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth"
import vuetify from './plugins/vuetify';
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
// import {
//   applyPolyfills,
//   defineCustomElements,
// } from '@aws-amplify/ui-components/loader';

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
var firebaseApp = firebase.initializeApp(firebaseConfig, "app");
firebase.analytics();

new Vue({
  el: "#app",
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export {
  firebaseApp
};

// Amplify.configure(aws_exports);
// applyPolyfills().then(() => {
//   defineCustomElements(window);
// });
