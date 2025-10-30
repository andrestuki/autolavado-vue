import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: "Login" },
  },
  {
    path: "/hidrobombas",
    name: "hidrobombas",
    component: () => import("@/ProductosView/HidrobombasView.vue"),
    meta: { title: "Hidrobombas" },
  },
  {
    path: "/formulario",
    name: "formulario",
    component: () => import("@/views/FormularioView.vue"),
    meta: { title: "Formulario" },
  },
  {
    path: "/shampoos",
    name: "shampoos",
    component: () => import("@/ProductosView/ShampoosView.vue"),
    meta: { title: "Shampoos" },
  },
  {
    path: "/pulidoras",
    name: "pulidoras",
    component: () => import("@/ProductosView/PulidorasView.vue"),
    meta: { title: "Pulidoras" },
  },
  {
    path: "/pinturas",
    name: "pinturas",
    component: () => import("@/ProductosView/PinturasView.vue"),
    meta: { title: "pinturas" },
  },
  {
    path: "/global",
    name: "/global",
    component: () => import("@/admin/GlobalView.vue"),
    meta: { title: "global" },
  },
  {
    path: "/Pulidorasadmin",
    name: "/Pulidorasadmin",
    component: () => import("@/admin/PulidorasAdminView.vue"),
    meta: { title: "Pulidoras admin" },
  },
  {
    path: "/Admin-Pinturas",
    name: "/Admin-Pinturas",
    component: () => import("@/admin/PinturasAdminView.vue"),
    meta: { title: "Pulidoras admin" },
  },
  {
    path: "/Admin-Shampoos",
    name: "/Admin-Shampoos",
    component: () => import("@/admin/ShampoosAdminView.vue"),
    meta: { title: "Pulidoras admin" },
  },
  {
    path: "/Admin-Hidrobombas",
    name: "/Admin-Hidrobombas",
    component: () => import("@/admin/HidrobombasAdminView.vue"),
    meta: { title: "Pulidoras admin" },
  },
  {
    path: "/inicio",
    name: "/inicio",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "Principal" },
  },

  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "Principal" },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { title: "Login" },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: { title: "About" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Cambia el título de la pestaña según la ruta
router.afterEach((to) => {
  document.title = to.meta.title || "Autolavado";
});

export default router;
