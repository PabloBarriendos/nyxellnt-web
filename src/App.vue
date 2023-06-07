<template>
  <v-app>
    <HeaderComponent />
    <router-view><v-content></v-content></router-view>
    <footerComponent />
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent';
import footerComponent from './components/footerComponent';
export default {
  name: 'App',

  components: {
    HeaderComponent,
    footerComponent,
  },
  data() {
    return {
    };
  },
  methods: {
  },

};
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0CETNH8XS0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0CETNH8XS0');
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>
