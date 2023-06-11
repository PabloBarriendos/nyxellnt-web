<template>
    <v-app>
      <v-main>
        <v-container>
          <GraficaComponent></GraficaComponent>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import GraficaComponent from '../components/GraficaComponent.vue';
  export default {
    components: { GraficaComponent },
  }
  </script>