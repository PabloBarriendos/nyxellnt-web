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
          { value: true, orden: 'Precio ascendente' },
          { value: false, orden: 'Precio descendente' },
        ]"></v-select>
        <v-card-actions class="btn-filtrar" v-on:click="requestFiltro">
          <v-btn>Filtrar</v-btn>
        </v-card-actions>
      </v-card-title>
    </v-card>

    <CardComponent v-for="evento in this.resultados" :key="evento.idEvento" :id="evento.idEvento" :titulo="evento.nombre"
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
      resultados: [],
      resultadosBuscador: [],
      search: "",
      genero: null,
      ordenPrecio: null
    };
  },
  async mounted() {
    await fetch('https://nyxellnt-api-2.azurewebsites.net/evento')
      .then(response => response.json())
      .then(data => this.resultados = data)
      .catch(error => console.error(error));
  },
  methods: {
    async buscar() {
      await fetch('https://nyxellnt-api-2.azurewebsites.net/evento')
        .then(response => response.json())
        .then(data => this.resultados = data)
        .catch(error => console.error(error));

      this.resultados = this.resultados.filter(item => {
        if (item.nombre.toLowerCase().includes(this.search) || item.cantante.toLowerCase().includes(this.search)) {
          return item
        }
      });

    },
    async requestFiltro() {
      if (this.genero == 'Todas las categorías' && this.ordenPrecio == null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/`)
          .then(response => response.json())
          .then(data => this.resultados = data)
          .catch(error => console.error(error));
      }
      if (this.genero != null && this.genero != 'Todas las categorías' && this.ordenPrecio == null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/genero/${this.genero}`)
          .then(response => response.json())
          .then(data => this.resultados = data)
          .catch(error => console.error(error));
      }
      if ((this.genero == null || this.genero == 'Todas las categorías') && this.ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/ordenarPrecio/${this.ordenPrecio}`)
          .then(response => response.json())
          .then(data => this.resultados = data)
          .catch(error => console.error(error));
      }
      if (this.genero != null && this.genero != 'Todas las categorías' && this.ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/genero/${this.genero}/precio/${this.ordenPrecio}`)
          .then(response => response.json())
          .then(data => this.resultados = data)
          .catch(error => console.error(error));
      }

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