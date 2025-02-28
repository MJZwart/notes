import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uno.css';

import axios from 'axios';
// @ts-ignore
window.axios = axios;
// @ts-ignore
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createApp(App).mount('#app')
