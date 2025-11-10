import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import DataView from 'primevue/dataview';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

// Configure all plugins
app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue)
app.use(pinia)

// Register components
app.component('ButtonPrime', Button)
app.component('DataView', DataView)
app.component('RatingPrime', Rating)
app.component('TagPrime', Tag)
app.component('InputNumber', InputNumber)

// Mount app only once
app.mount('#app')

export { app }
