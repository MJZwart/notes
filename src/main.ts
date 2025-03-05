import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uno.css';

import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
// @ts-ignore
window.axios = axios;
// @ts-ignore
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const app = createApp(App);

const routes = [
    {
        path: '/',
        component: () => import('./notes/Notes.vue'),
    },
    {
        path: '/login',
        component: () => import('./auth/Login.vue'),
    },
    {
        path: '/register',
        component: () => import('./auth/Register.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router);

app.mount('#app');
