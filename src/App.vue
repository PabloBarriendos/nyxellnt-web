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
  created(){
    this.$store.dispatch("cargarFestivales");
  }

};
</script>

<style>
.v-main {
  padding: 0 !important;
}

.v-dialog{
  margin-top: 90px;
  max-width: 90%;
  max-height: 80% !important;
}
</style>
