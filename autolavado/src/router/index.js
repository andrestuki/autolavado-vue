import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/pulidoras',
    name: 'pulidoras',
    component: () => import('@/views/PulidorasView.vue'),
    meta: { title: 'Pulidoras' }

  },
  {
    path:'/admin',
    name:'admin',
    component: ()=> import('@/views/AdminView.vue'),
    meta:{title: 'admin'}
    // Cicharp T_T... no he estudiado... solo es manejo de apis no?... endpoints y esa mkada
  },
  
  {
    path: '/',
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
