import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Home from './views/Home.vue';
import Post from './views/Post.vue';
import Contact from './views/Contact.vue';
import Settings from './views/Settings.vue';
import Schedule from './views/Schedule.vue';
import Profile from './views/Profile.vue';
import Payment from './views/Payment.vue';
import AddPoints from './views/AddPoints.vue';
import MapView from './components/MapView.vue';
// import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/',
            redirect: '/home'
            // name: 'landing',
            // component: HelloWorld
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/post',
            name: 'Post',
            component: Post,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/map-view',
            name: 'MapView',
            component: MapView,
            props: true
        },
        {
            path: '/addpoints',
            name: 'AddPoints',
            component: AddPoints,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/payment',
            name: 'Payment',
            component: Payment,
            meta: {
                requiresAuth: true
            }
        }
    ]
});


// firebase.auth().onAuthStateChanged((user) => {
//     console.log("On Auth State Changed")
//     if (!user) {
//         // alert("No such user exits. Redirecting to login");
//         router.replace('/home');
//     } else {
//         console.log("Sesión iniciada -> " + user.email);
//     }
// });

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // else if(!requiresAuth && currentUser) next('home');
    if (to.name == "home") {
        if (requiresAuth && !currentUser) {
            next('login');
        } else {
            next();
        }
    } else {
        next();
    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log("On Auth State Changed")
        if (user) {
            // alert("No such user exits. Redirecting to login");
            // router.replace('/home');
            // console.log(this.$store.state);
            if (requiresAuth && !user) {
                next('login');
            } else {
                next();
            }
            // next();
        } else {
            // console.log("Sesión iniciada -> " + user.email);
            // router.replace('/home');
        }
    });
});

// router.beforeEach((to, from, next) => {
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     const user = firebase.auth().currentUser;
//     firebase.auth().onAuthStateChanged((user) => {
//         if (requiresAuth && !user) {
//             alert("Please login");
//             next('/login');
//         } else {
//             next();
//         }
//     });
// })

export default router;
