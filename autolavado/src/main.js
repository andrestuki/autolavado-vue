import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import DataView from 'primevue/dataview';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import 'primeicons/primeicons.css'


const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.component('ButtonPrime', Button);
app.component('DataView', DataView);
app.component('RatingPrime', Rating);
app.component('TagPrime', Tag);

app.use(PrimeVue);
app.mount('#app');
export {app};
