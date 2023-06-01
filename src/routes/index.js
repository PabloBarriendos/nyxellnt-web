import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import FestivalView from "../views/FestivalView.vue";
import MisFestivalesView from "../views/MisFestivalesView.vue";
import CarritoView from "../views/CarritoView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/festival", component: FestivalView },
  { path: "/mis-festivales", component: MisFestivalesView },
  { path: "/carrito", component: CarritoView },
];

const router = new VueRouter({
  routes,
});

export default router;
