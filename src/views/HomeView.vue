<template>
  <v-container class="home-container">
    <v-card class="filtros">
      <v-card-title>
        Filtros
        <div class="buscador-container">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
            class="buscador"></v-text-field>
          <v-card-actions v-on:click="buscar" class="btn-buscar">
            <v-btn>Buscar</v-btn>
          </v-card-actions>
        </div>
        <v-select v-model="genero" class="categoriasFilter" label="Categorías" :items="[
          'Todas las categorías',
          'Rock',
          'Pop',
          'Flamenco',
          'Jazz',
          'Musical',
          'Opera',
        ]"></v-select>
        <v-select v-model="ordenPrecio" class="precioFilter" label="Ordenar por precio" item-text="orden" :items="[
          { value: 'asc', orden: 'Precio ascendente' },
          { value: 'des', orden: 'Precio descendente' },
        ]"></v-select>
        <v-card-actions class="btn-filtrar" v-on:click="requestFiltro">
          <v-btn>Filtrar</v-btn>
        </v-card-actions>
      </v-card-title>
    </v-card>

    <CardComponent v-for="evento in $store.state.showEventList" :key="evento.idEvento" :id="evento.idEvento" :titulo="evento.nombre"
      :cantante="evento.cantante" :descripcion="evento.descripcion" :localidad="evento.localidad"
      :genero="evento.categoria" :precio="evento.precioEntrada" :fecha="evento.fecha" />
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
      search: "",
      genero: null,
      ordenPrecio: null
    };
  },
  async mounted() {
    this.$store.dispatch("cargarEventos");
  },
  methods: {
    async buscar() {
      this.$store.dispatch("buscar", this.search);
    },
    async requestFiltro() {
      this.$store.dispatch("requestFiltroHome", {genero: this.genero, ordenPrecio: this.ordenPrecio});
    }
  }

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