<template>
  <v-container class="home-container">
    <v-card class="filtros">
      <v-card-title>
        Filtros
        <div class="buscador-container">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            class="buscador"
          ></v-text-field>
          <v-card-actions v-on:click="buscar" class="btn-buscar">
            <v-btn>Buscar</v-btn>
          </v-card-actions>
        </div>
        <v-select
          v-model="ordenFecha"
          class="fechaFilter"
          label="Ordenar por fecha"
          item-text="orden"
          :items="[
            { value: true, orden: 'Fecha más reciente' },
            { value: false, orden: 'Fecha más antigua' },
          ]"
        ></v-select>
      </v-card-title>
      <v-card-actions class="btn-filtrar" v-on:click="requestFiltro">
        <v-btn>Filtrar</v-btn>
      </v-card-actions>
    </v-card>

    <MisFestivalesCardComponent
      v-for="item in $store.state.showMisComprasList"
      :key="item.operacion.idOperacion"
      :id="item.operacion.idOperacion"
      :titulo="item.festival.nombre"
      :artistas="item.festival.artistas"
      :descripcion="item.festival.descripcion"
      :localidad="item.festival.localidad"
      :mes="item.festival.mes"
      :precioEntrada="item.festival.precioEntrada"
      :fecha="item.festival.fecha"
      :fechaCompra="item.operacion.fechaCompra"
      :precioTotal="item.operacion.precioTotal"
      :numEntradas="item.operacion.numEntradasCompradas"
    />
  </v-container>
</template>
  
<script>
import MisFestivalesCardComponent from "../components/MisFestivalesCardComponent.vue";

export default {
  name: "MisFestivalesComponent",
  components: {
    MisFestivalesCardComponent,
  },
  data() {
    return {
      search: "",
      ordenFecha: null,
    };
  },
  async created() {
    this.$store.dispatch("getOperaciones");
  },
  methods: {
    async buscar() {
      this.$store.dispatch("buscarOperacion", this.search);
    },
    async requestFiltro() {
      this.$store.dispatch("requestFiltroOperaciones", this.ordenFecha);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.home-container {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .filtros {
    height: 250px;
    margin-bottom: 60px;
    .buscador-container {
      width: 100%;
      display: flex;
      margin-bottom: 10px;

      .buscador {
        width: 100%;
        margin-right: 20px;
      }
    }

    .fechaFilter {
      width: 200px;
      margin-right: 40px;
    }
  }

  .tarjeta {
    margin: 40px;
  }
}
</style>