import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Home from './views/Home.vue';
import Post from './views/Post.vue';
import Browse from './views/Browse.vue';
import Settings from './views/Settings.vue';
import Schedule from './views/Schedule.vue';
// import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
            // name: 'landing',
            // component: HelloWorld
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
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
            component: Post
        },
        {
            path: '/browse',
            name: 'Browse',
            component: Browse
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth =  to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    //else if(!requiresAuth && currentUser) next('home');
    else next();
});

export default router;
