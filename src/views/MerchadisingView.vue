<template>
    <v-app>
      <v-main>
        <v-container>
          <MerchandisingComponent></MerchandisingComponent>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import MerchandisingComponent from '../components/MerchandisingComponent.vue';
  export default {
    components: { MerchandisingComponent },
  }
  </script>