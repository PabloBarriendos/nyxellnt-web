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
        <v-select class="categoriasFilter" label="Categorías" :items="[
          'Todas las categorías',
          'Rock',
          'Pop',
          'Flamenco',
          'Jazz',
          'Musical',
          'Opera',
        ]"></v-select>
        <v-select class="precioFilter" label="Ordenar por precio"
          :items="['Precio ascendente', 'Precio descendente']"></v-select>
        <v-card-actions class="btn-filtrar">
          <v-btn>Filtrar</v-btn>
        </v-card-actions>
      </v-card-title>
    </v-card>

    <CardComponent />
    <CardComponent />
    <CardComponent />
    <CardComponent />
  </v-container>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    CardComponent,
  },
  data() {
    return {
      resultados: [],
      search: "",
      checkbox1: true,
      checkbox2: false,
    };
  },

  mounted() {
    fetch('https://nyxellnt-api-2.azurewebsites.net/evento')
      .then(response => response.json())
      .then(data => this.resultados = data)
      .catch(error => console.error(error));
    console.log(this.resultados)
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

.filtros .categoriasFilter {
  width: 200px;
  margin-right: 40px;
}

.filtros .precioFilter {
  width: 200px;
  margin-right: 40px;
}

.btn-buscar {
  width: 78px;
  padding: 0;
}

.btn-filtrar {
  padding: 0;
  margin-right: 100%;
}
</style>