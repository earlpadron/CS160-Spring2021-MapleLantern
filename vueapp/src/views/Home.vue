<template>
    <div class="home">
        <h3>HOME</h3>
        <button @click="logout"> Log out </button>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name:'home',
    data() {
        return {};
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
            })
        }
    }
}
</script>

<style scoped>

</style>