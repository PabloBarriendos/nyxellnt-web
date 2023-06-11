<template>
    <v-app>
      <v-main>
        <v-container>
          <PerfilComponent></PerfilComponent>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import PerfilComponent from '../components/PerfilComponent.vue';
  export default {
    components: { PerfilComponent },
  }
  </script>