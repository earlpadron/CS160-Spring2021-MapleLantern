<template>
  <div class="home">
    <v-container>
      <h3>HOME</h3>
      <button @click="logout">Log out</button>
    </v-container>

    <v-container>
      <v-btn color="success" class="mr-4" @click="post()">
        Create A Post
      </v-btn>
    </v-container>

    <v-app id="inspire">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

          <v-btn v-for="link in links" :key="link" text>
            {{ link }}
          </v-btn>

          <v-spacer></v-spacer>

<!-- TODO: add on enter to start the search -->
          <v-responsive max-width="260">
            <v-text-field
              v-model="searchKeywords"
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
                  <v-list-item v-for="n in 5" :key="n" link>
                    <v-list-item-content>
                      <v-list-item-title> List Item {{ n }} </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet min-height="70vh" rounded="lg"> </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      links: ["Dashboard", "Messages", "Profile", "Updates"],
      searchKeywords:"",
    };
  },

  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
          alert("You are signed out");
        });
    },
    post: function () {
      this.$router.replace("/post");
      alert("Redirecting to post creation page");
    },

    search: async function() {
      const db = firebase.firestore();
      const keywords = this.search.split(/(\s+)/);
      let fromName = db.collection("Activities").whereContains("name", keywords);
      let fromDesc = db.collection("Activities").whereContains("description", keywords);
      let fromCat = db.collection("Activities").where("category", "array-contains-any", keywords);
    
      const [nameRes, descRes, catRes] = await Promise.all([
        fromName, fromDesc,fromCat
      ]).then(() => {
          console.log("Successfully found all the activities");
        })
        .catch((err) => {
          console.error("Error has occurred when added the data: ", err);
        });

      const allRes =nameRes.concat(descRes).concat(catRes);

    }
  },
};
</script>

<style scoped>
</style>