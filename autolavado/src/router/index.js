import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProductosView from '@/views/ProductosView.vue';
import MecanicoView from '@/views/mecanicoView.vue';
import AutolavadoView from '@/views/autolavadoView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/productos',
    name: 'productos',
    component: ProductosView,
    meta: { title: 'Productos' }
  },
  {
    path:'/mecanico',
    name: 'mecanico',
    component: MecanicoView,
    meta: { title: 'Mecanico' }
  },
  {
    path: '/autolavado',
    name: 'autolavado',
    component:AutolavadoView,
    meta: { title: 'Autolavado' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Principal' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { title: 'About' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Cambia el título de la pestaña según la ruta
router.afterEach((to) => {
  document.title = to.meta.title || 'Autolavado';
});

export default router
