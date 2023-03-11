<template>
  <v-container class="home-container">
    <v-card class="filtros">
      <v-card-title>
        Filtros
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
          class="buscador"></v-text-field>
        <v-select class="categoriasFilter" label="Categorías"
          :items="['Rock', 'Pop', 'Flamenco', 'Jazz', 'Musical', 'Opera']"></v-select>
        <v-select class="precioFilter" label="Ordenar por precio"
          :items="['Precio ascendente', 'Precio descendente']"></v-select>
      </v-card-title>
    </v-card>

    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
  </v-container>
</template>

<script>
import CardComponent from "./CardComponent";

export default {
  name: "HomeComponent",
  components: {
    CardComponent,
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
  /* border: 1px solid red; */
  height: 200px;
  margin-bottom: 60px;
}

.filtros .buscador {
  width: 100%;
  margin-right: 40px;
  margin-bottom: 10px;
}

.filtros .categoriasFilter {
  width: 200px;
  margin-right: 40px;
}

.filtros .precioFilter {
  width: 200px;
  margin-right: 40px;
}

.btn-filtrar {
  padding: 0;
  margin-right: 100%;
}
</style>