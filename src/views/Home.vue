<template>
    <div class="home">
      <v-container>
        <h3>HOME</h3>
        <button @click="logout"> Log Out </button>
      </v-container>

      <v-container>
        <v-btn
            color="success"
            class="mr-4"
            @click="post()"
          >
            Create A Post
          </v-btn>
      </v-container>

      <v-app id="inspire">
        <v-app-bar
          app
          color="white"
          flat
        >
          <v-container class="py-0 fill-height">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="32"
            ></v-avatar>

            <v-btn
              v-for="link in links"
              :key="link"
              text
            >
              {{ link }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-responsive max-width="260">
              <v-text-field
                dense
                flat
                hide-details
                rounded
                solo-inverted
              ></v-text-field>
            </v-responsive>
          </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-sheet rounded="lg">
                  <v-list color="transparent">
                    <v-list-item
                      v-for="n in 5"
                      :key="n"
                      link
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          List Item {{ n }}
                          
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list>
                </v-sheet>
              </v-col>

              <v-col>
                <v-sheet
                  min-height="70vh"
                  rounded="lg"
                >
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name:'home',
    data() {
        return {
          links: [
          'browse',
          'schedule',
          'profile',
          'settings',
      ],
        };
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
                alert('You are signed out')
            })
        },
        post: function() {
            this.$router.replace('/post')
            alert('Redirecting to post creation page')
        }
    }
}
</script>

<style scoped>
</style>