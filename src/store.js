import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            email: "",
            userType: undefined,
            points: 0,
            name: undefined,
            docID: "",
            docPath:"",
            allActivities:[],
            activities:[],
            profilePic:"",
        },
        activities:[]
    },
    getter: {
        getUser: state => {
            return state.user;
        }
    },
    mutation: {

    },
    action: {

    }
})
