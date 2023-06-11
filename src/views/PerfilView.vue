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
  created() {
    if (this.$store.state.userLogged == false) {
      this.$router.push(`/`).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}
</script>