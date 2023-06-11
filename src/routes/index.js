import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CookiesView from "../views/CookiesView.vue";
import ContactoView from "../views/ContactoView.vue"
import FestivalView from "../views/FestivalView.vue";
import MisFestivalesView from "../views/MisFestivalesView.vue";
import CarritoView from "../views/CarritoView.vue";
import CompraFinalizadaView from "../views/CompraFinalizadaView.vue";
<<<<<<< HEAD
import GraficaView from "../views/GraficaView.vue"
=======
import PerfilView from "../views/PerfilView.vue"
>>>>>>> feature/perfil

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/cookies", component: CookiesView },
  { path: "/contacto", component: ContactoView },
  { path: "/festival", component: FestivalView },
  { path: "/mis-festivales", component: MisFestivalesView },
  { path: "/carrito", component: CarritoView },
  { path: "/compraFinalizada", component: CompraFinalizadaView },
<<<<<<< HEAD
  { path: "/grafica", component: GraficaView },
=======
  { path: "/perfil", component: PerfilView },
>>>>>>> feature/perfil
];

const router = new VueRouter({
  routes,
});

export default router;
