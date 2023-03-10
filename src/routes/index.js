import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/HomeView.vue'
import EventComponent from '../views/EventView.vue';
import MisEventosComponent from '../views/MisEventosView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/evento', component: EventComponent },
  { path: '/mis-eventos', component: MisEventosComponent }
]

const router = new VueRouter({
  routes
})

export default router;