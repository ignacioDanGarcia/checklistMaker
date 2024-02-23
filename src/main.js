import './assets/css/bootstrap.min.css';
import './assets/css/dataTables.bootstrap5.min.css';
import './assets/css/style.css';
import './assets/js/bootstrap.bundle.min.js';
import './assets/js/jquery-3.5.1.js';
import './assets/js/jquery.dataTables.min.js';
import './assets/js/dataTables.bootstrap5.min.js';
import './assets/js/scriptChart.js';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js';
const app = createApp(App)

app.use(store);
app.use(router)

app.mount('#app')
