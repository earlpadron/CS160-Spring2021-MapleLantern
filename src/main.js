import Vue from 'vue'
import App from './App.vue'

import router from './router'
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth"
import vuetify from './plugins/vuetify';
// import store from "./store";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
  return {
    user: {
      email: "",
      userType: undefined,
      points: 0,
      name: undefined,
      docID: "",
      docPath: "",
      allActivities: [],
      activities: [],
      profilePic:"",
    },
    activities: []
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: {
      email: "",
      userType: undefined,
      points: 0,
      name: undefined,
      docID: "",
      docPath: "",
      allActivities: [],
      activities: [],
      profilePic:"",
    },
    activities: []
  },
  getters: {
    getEmail: function () {
      return this.$state.email;
    },

    getRes: function () {
      return this.$state.results;
    }
  },
  mutations: {
    setEmail(state, email) {
      state.user.email = email;
    },
    setUserType(state, userType) {
      state.user.userType = userType;
    },
    setPoints(state, points) {
      state.user.points = points;
    },
    setName(state, name) {
      state.user.name = name;
    },
    setDocID(state, docID) {
      state.user.docID = docID;
    },
    setDocPath(state, docPath) {
      state.user.docPath = docPath;
    },
    setAllActivities(state, allActivities) {
      state.user.allActivities = allActivities;
    },
    setActivities(state, activities) {
      state.user.activities = activities;
    },
    setProfilePic(state, profilePic) {
      state.user.profilePic = profilePic;
    },
    // reset default state modules by looping around the initialStoreModules
    resetState(state) {
      // _.forOwn(initialStoreModules, (value, key) => {
      //   state[key] = _.cloneDeep(value.state);
      // });
      Object.assign(state, getDefaultState())
    },
  },
  action: {

  },
  plugins: [createPersistedState()]

})

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
  store,
  render: h => h(App)
}).$mount('#app')

export {
  firebaseApp
};

