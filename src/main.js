import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  VueRouter,
  render: h => h(App)
}).$mount('#app')
