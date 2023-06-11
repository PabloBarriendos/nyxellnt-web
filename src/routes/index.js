import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CookiesView from "../views/CookiesView.vue";
import ContactoView from "../views/ContactoView.vue"
import MisFestivalesView from "../views/MisFestivalesView.vue";
import CarritoView from "../views/CarritoView.vue";
import CompraFinalizadaView from "../views/CompraFinalizadaView.vue";
import GraficaView from "../views/GraficaView.vue"
import PerfilView from "../views/PerfilView.vue"
import MerchandisingView from "../views/MerchadisingView.vue"

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/cookies", component: CookiesView },
  { path: "/contacto", component: ContactoView },
  { path: "/mis-festivales", component: MisFestivalesView },
  { path: "/carrito", component: CarritoView },
  { path: "/compraFinalizada", component: CompraFinalizadaView },
  { path: "/grafica", component: GraficaView },
  { path: "/perfil", component: PerfilView },
  { path: "/merchandising", component: MerchandisingView },
];

const router = new VueRouter({
  routes,
});

export default router;
