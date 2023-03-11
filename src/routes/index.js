import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent';
import EventComponent from '../components/EventComponent';
import MisEventosComponent from '../components/MisEventosComponent'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/evento', component: EventComponent },
  { path: '/mis-eventos', component: MisEventosComponent }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
