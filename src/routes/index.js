import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
