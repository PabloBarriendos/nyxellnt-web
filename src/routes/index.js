import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventView from "../views/EventView.vue";
import MisEventosView from "../views/MisEventosView.vue";
import CookiesView from "../views/CookiesView.vue";
import ContactoView from "../views/ContactoView.vue"

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/evento", component: EventView },
  { path: "/mis-eventos", component: MisEventosView },
  { path: "/cookies", component: CookiesView },
  { path: "/contacto", component: ContactoView }
];

const router = new VueRouter({
  routes,
});

export default router;
