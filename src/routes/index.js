import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventView from "../views/EventView.vue";
import MisEventosView from "../views/MisEventosView.vue";
import CookiesView from "../views/CookiesView.vue";
import ContactoView from "../views/ContactoView.vue"
import HomeComponent from "../views/HomeView.vue";
import EventComponent from "../views/EventView.vue";
import MisFestivalesComponent from "../views/MisFestivalesView.vue";
import CarritoComponent from "../views/CarritoComponent.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/cookies", component: CookiesView },
  { path: "/contacto", component: ContactoView },
  { path: "/festival", component: FestivalView },
  { path: "/mis-festivales", component: MisFestivalesComponent },
  { path: "/carrito", component: CarritoComponent },
];

const router = new VueRouter({
  routes,
});

export default router;
