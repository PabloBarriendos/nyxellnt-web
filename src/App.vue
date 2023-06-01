<template>
  <v-app>
    <HeaderComponent v-show="showHeader"/>
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
  data () {
    return {
      showHeader: true,
      // showHeader: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Si la posición del desplazamiento es mayor a 0, ocultar el encabezado
      if (window.scrollY > 0) {
        this.showHeader = true;
      } else {
        // Si la posición del desplazamiento es 0, mostrar el encabezado
        this.showHeader = true;
        // this.showHeader = false;
      }
    },
  },

};
</script>

<style scoped>

/* .header-container{
  display: none;
} */


.v-main {
  padding: 0 !important;
}
</style>
