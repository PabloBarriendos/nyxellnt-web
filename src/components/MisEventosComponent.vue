<template>
  <v-container class="home-container">
    <v-card class="filtros">
      <v-card-title>
        Filtros
        <div class="buscador-container">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
            class="buscador"></v-text-field>
          <v-card-actions class="btn-buscar">
            <v-btn>Buscar</v-btn>
          </v-card-actions>
        </div>
        <v-select class="precioFilter" label="Ordenar por fehca"
          :items="['Fecha más reciente', 'Fecha más antigua']"></v-select>
      </v-card-title>
      <v-card-actions class="btn-filtrar">
        <v-btn>Filtrar</v-btn>
      </v-card-actions>
    </v-card>

    <MisEventosCardComponent />
    <MisEventosCardComponent />
    <MisEventosCardComponent />
  </v-container>
</template>
  
<script>
import MisEventosCardComponent from "./MisEventosCardComponent";

export default {
  name: "MisEventosComponent",
  components: {
    MisEventosCardComponent,
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>
  
<style scoped>
.home-container {
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.home-container .tarjeta {
  margin: 40px;
}

.filtros {
  height: 250px;
  margin-bottom: 60px;
}

.filtros .buscador-container {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.filtros .buscador {
  width: 100%;
  margin-right: 20px
}

.filtros .precioFilter {
  width: 200px;
  margin-right: 40px;
}
</style>