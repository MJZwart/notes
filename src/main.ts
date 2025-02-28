import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uno.css';

// ! The following lines would be needed to make requests to own Laravel server
// import axios from 'axios';
// @ts-ignore
// window.axios = axios;
// @ts-ignore
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createApp(App).mount('#app')
