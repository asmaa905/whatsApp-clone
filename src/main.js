import { createApp } from 'vue';
import './style.css';
import 'tailwindcss/tailwind.css';
import App from './App.vue';
import router from '@/router';

import vue3GoogleLogin from 'vue3-google-login';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vue3GoogleLogin, {
    clientId: "878858859701-ngt2r2j69sfrad7josmdce93rmfcip7h.apps.googleusercontent.com",

});
app.mount('#app');
