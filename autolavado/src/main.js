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
import OverlayBadge from 'primevue/overlaybadge';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue)
app.use(pinia)

// Registrar componentes
app.component('ButtonPrime', Button)
app.component('DataView', DataView)
app.component('RatingPrime', Rating)
app.component('TagPrime', Tag)
app.component('InputNumber', InputNumber)
app.component('OverlayBadge', OverlayBadge)
app.component('AvatarPrime', Avatar)
app.component('AvatarGroup', AvatarGroup)

app.mount('#app')

export { app }
