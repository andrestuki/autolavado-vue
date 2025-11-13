import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import CarritoView from "@/views/CarritoView.vue";
import OrdenesView from "@/views/OrdenesView.vue";
import HidrobombasView from "@/views/HidrobombasView.vue";
import ShampoosView from "@/views/ShampoosView.vue";
import PulidorasView from "@/views/PulidorasView.vue";
import PinturasView from "@/views/PinturasView.vue";

const routes = [
  { path: "/cart", component: CarritoView },
  { path: "/carrito", component: CarritoView, meta: { title: "Carrito" } },
  { path: "/ordenes", component: OrdenesView, meta: { title: "Mis Órdenes" } },

  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: "Login" },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    meta: { title: "Registro" },
  },
  {
    path: "/registro",
    redirect: "/signup",
  },
  {
    path: "/hidrobombas",
    name: "hidrobombas",
    component: HidrobombasView,
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
    component: ShampoosView,
    meta: { title: "Shampoos" },
  },
  {
    path: "/pulidoras",
    name: "pulidoras",
    component: PulidorasView,
    meta: { title: "Pulidoras" },
  },
  {
    path: "/pinturas",
    name: "pinturas",
    component: PinturasView,
    meta: { title: "Pinturas" },
  },
  {
    path: "/global",
    name: "global",
    component: () => import("@/admin/GlobalView.vue"),
    meta: { title: "Admin - Panel Principal" },
  },
  {
    path: "/admin/pulidoras",
    name: "admin-pulidoras",
    component: () => import("@/admin/PulidorasAdminView.vue"),
    meta: { title: "Admin - Pulidoras" },
  },
  {
    path: "/admin/pinturas",
    name: "admin-pinturas",
    component: () => import("@/admin/PinturasAdminView.vue"),
    meta: { title: "Admin - Pinturas" },
  },
  {
    path: "/admin/shampoos",
    name: "admin-shampoos",
    component: () => import("@/admin/ShampoosAdminView.vue"),
    meta: { title: "Admin - Shampoos" },
  },
  {
    path: "/admin/hidrobombas",
    name: "admin-hidrobombas",
    component: () => import("@/admin/HidrobombasAdminView.vue"),
    meta: { title: "Admin - Hidrobombas" },
  },
  {
    path: "/admin/citas",
    name: "admin-citas",
    component: () => import("@/admin/CitasAdminView.vue"),
    meta: { title: "Admin - Gestión de Citas" },
  },
  // Redirecciones para mantener compatibilidad con rutas antiguas
  {
    path: "/Pulidorasadmin",
    redirect: "/admin/pulidoras",
  },
  {
    path: "/Admin-Pinturas",
    redirect: "/admin/pinturas",
  },
  {
    path: "/Admin-Shampoos",
    redirect: "/admin/shampoos",
  },
  {
    path: "/Admin-Hidrobombas",
    redirect: "/admin/hidrobombas",
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
