<template>
  <v-app>
    <v-main>
      <v-container>
        <ContactoComponent></ContactoComponent>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ContactoComponent from '../components/ContactComponent.vue';
export default {
  components: { ContactoComponent },
}
</script>