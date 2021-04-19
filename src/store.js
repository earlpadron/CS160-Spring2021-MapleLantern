import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            email: "",
            userType: "",
            points: 0,
            name:"",
            docID: "",
            docPath:""
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
