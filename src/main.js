import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./routes/index";
// import VueAnalytics from "vue-analytics";
// import VueGtag from "vue-gtag";
// import VueOptimize from "vue-optimize";

Vue.config.productionTip = false;

// Vue.use(VueAnalytics, {
//   id: "G-0CETNH8XS0",
//   router: router,
// });

// Vue.use(VueGtag, {
//   config: {
//     id: "GTM-0CETNH8XS0",
//   },
// });

// Vue.use(VueOptimize);

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
