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

    <MisEventosCardComponent
      v-for="item in this.resultados"
      :key="item.operacion.idOperacion"
      :id="item.operacion.idOperacion"
      :titulo="item.evento.nombre"
      :cantante="item.evento.cantante"
      :descripcion="item.evento.descripcion"
      :localidad="item.evento.localidad"
      :genero="item.evento.categoria"
      :precioEntrada="item.evento.precioEntrada"
      :fecha="item.evento.fecha"
      :fechaCompra="item.operacion.fechaCompra"
      :precioTotal="item.operacion.precioTotal"
      :numEntradas="item.operacion.numEntradasCompradas"
    />
  </v-container>
</template>
  
<script>
import MisEventosCardComponent from "../components/MisEventosCardComponent.vue";

export default {
  name: "MisEventosComponent",
  components: {
    MisEventosCardComponent,
  },
  data() {
    return {
      listaEventos: [],
      listaOperaciones: [],
      resultados: [],
      search: "",
      ordenFecha: null,
    };
  },
  async mounted() {
    await fetch(
      `https://nyxellnt-api-2.azurewebsites.net/operacion/idUsuario/${this.$route.query.id}`
    )
      .then((response) => response.json())
      .then((data) => (this.listaOperaciones = data))
      .catch((error) => console.error(error));

    await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento`)
      .then((response) => response.json())
      .then((data) => (this.listaEventos = data))
      .catch((error) => console.error(error));
    this.resultados = [];

    this.listaOperaciones.forEach((operacion) => {
      this.listaEventos.forEach((evento) => {
        if (operacion.idEvento == evento.idEvento) {
          this.resultados.push({ operacion, evento });
        }
      });
    });
  },
  methods: {
    async buscar(){
      await fetch(
      `https://nyxellnt-api-2.azurewebsites.net/operacion/idUsuario/${this.$route.query.id}`
    )
      .then((response) => response.json())
      .then((data) => (this.listaOperaciones = data))
      .catch((error) => console.error(error));

    await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento`)
      .then((response) => response.json())
      .then((data) => (this.listaEventos = data))
      .catch((error) => console.error(error));
    this.resultados = [];

    this.listaOperaciones.forEach((operacion) => {
      this.listaEventos.forEach((evento) => {
        if (operacion.idEvento == evento.idEvento) {
          this.resultados.push({ operacion, evento });
        }
      });
    });

      this.resultados = this.resultados.filter(item => {
        if(item.evento.nombre.toLowerCase().includes(this.search) || item.evento.cantante.toLowerCase().includes(this.search)){
          return item
        }
      });

    },
    async requestFiltro() {
      if (this.ordenFecha != null) {
        await fetch(
          `https://nyxellnt-api-2.azurewebsites.net/operacion/idUsuario/${this.$route.query.id}`
        )
          .then((response) => response.json())
          .then((data) => (this.listaOperaciones = data))
          .catch((error) => console.error(error));

        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento`)
          .then((response) => response.json())
          .then((data) => (this.listaEventos = data))
          .catch((error) => console.error(error));

        if(this.ordenFecha == true){
          this.listaOperaciones.sort((a, b) => new Date(a.fechaCompra) - new Date(b.fechaCompra));
        }else{
          this.listaOperaciones.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));
        }
        this.resultados = [];

        this.listaOperaciones.forEach((operacion) => {
          this.listaEventos.forEach((evento) => {
            if (operacion.idEvento == evento.idEvento) {
              this.resultados.push({ operacion, evento });
            }
          });
        });


      }
    },
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
  margin-right: 20px;
}

.filtros .fechaFilter {
  width: 200px;
  margin-right: 40px;
}
</style>