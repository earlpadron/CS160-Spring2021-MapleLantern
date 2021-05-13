<template>
    <div class="schedule">
        <v-main class="grey lighten-3">
          <v-container>
            <v-card
              v-for="post in posts"
              :key="post"
              text
              class="pa-4"
            >
              {{ post }}
            </v-card>
          </v-container>
        </v-main>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name:'schedule',
    data() {
        return {
          posts: [
          'schedule1',
          'dummy2',
          'dummy3',
          'dummy4',
          ],
        };
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login');
            })
        },
        post: function() {
            this.$router.replace('/post');

        }
    }
}
</script>

<style scoped>
</style>