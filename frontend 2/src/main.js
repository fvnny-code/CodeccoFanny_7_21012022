import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router';
import axios from 'axios';

createApp(App).use(router).use(axios).mount('#app')

