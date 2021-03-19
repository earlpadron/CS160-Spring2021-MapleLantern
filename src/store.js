import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        email:"",
        userType:""
    },
    getter: {
        getEmail: state => {
            return state.email;
        }
    },
    mutation: {

    },
    action: {

    }
})
