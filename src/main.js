// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importa el store

createApp(App)
  .use(router)
  .use(store) // Usa el store
  .mount('#app');
