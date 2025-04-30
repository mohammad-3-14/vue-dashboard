import { createApp } from 'vue';
import Router from './router';
import './assets/styles/main.css';
import i18n from './plugins/i18n';
import App from '@/App.vue';

const app = createApp(App);
app.use(Router);
app.use(i18n);
app.mount('#app');
