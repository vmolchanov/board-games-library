import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import {createRouter, createWebHistory, RouterOptions} from 'vue-router';
import {routes} from './router';

const router = createRouter(<RouterOptions>{
  history: createWebHistory(),
  routes: routes,
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
