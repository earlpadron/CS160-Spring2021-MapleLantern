<template>
  <div class="login">
    <v-container></v-container>
    <v-container></v-container>
    <v-container></v-container>

        <v-btn
            color="success"
            class="mr-4"
            @click="back()"
          >
            Back to Home Page
          </v-btn>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="800"
      >
        <v-form
        class="pa-5"
        ref="form"
        v-model="valid"
        lazy-validation
        >
          <h1>Purchase Points</h1>

          <v-list-item-content>
                  <v-list-item-title class="title" style="margin-top: 10px">How many points would you like to purchase?</v-list-item-title>
          </v-list-item-content>
          

          <v-overflow-btn
            v-model="Points"
            :items="points"
            item-text="Points"
            label="Select number of points"
            single-line
            required
          ></v-overflow-btn>

          <v-btn
            color="success"
            class="mr-4"
            @click="SaveInfo()"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  
  import firebase from 'firebase';
  import 'firebase/firestore'
  import firebaseApp from '../main';



  var payment_db = firebase.firestore().collection("/PaymentInfo");
  var citizens = firebase.firestore().collection("/Citizens");

  export default {
    name: "addpoints",  
    data() {
      return {
        user: this.$store.state.user.email,
        test: 4,
        Purchasedpoints: null,
        prevpoints: this.$store.state.user.points,
        docID: this.$store.state.user.docID,
        points: [
          { Points: 10},
          { Points: 20},
          { Points: 30},
          { Points: 40},
          { Points: 50},
          { Points: 60},
          { Points: 70},
          { Points: 80},
          { Points: 90},
          { Points: 100}
        ]
      };
    },
    methods: {
      SaveInfo() {
        var docRef = payment_db.doc(this.user);

        docRef.get().then((doc) => {
            if (doc.exists) {
                citizens.doc(this.docID).update({
                    "points": this.Points + this.prevpoints
                })
                this.$store.state.user.points = this.Points + this.prevpoints;
                alert("Purchase Successful!");
            } else {
                this.$router.replace('/payment')
                alert('You must add payment information before purchasing points. Redirecting to Payment Info page')
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        // db.doc(this.Email).set({
        //     Email: this.Email,
        //     PaymentMethod: this.PaymentMethod,
        //     CardNumber: this.CardNumber,
        //     ExpiryDate: this.ExpiryDate,
        //     CVVCode: this.CVVCode
        //   })
        //     .then(function (docRef) {
        //       console.log(this);
        //       alert("Payment Information saved successfully");
        //     })
        //     .catch(function (error) {
        //       console.error('Error adding document: ', error)
        //       alert("error saving payment info");
        //     })
      },
      back() {
          this.$router.replace('/home')
          alert('Redirecting to home page')
      }
    }
  };
</script>