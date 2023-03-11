<template>
  <v-app>
    <HeaderComponent/>
    <router-view><v-content></v-content></router-view>
    <footerComponent/>
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
  data: () => ({
  }),
};
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>
