<template>
  <v-container class="operaciones-container">
    <div class="filtro-section">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details class="buscador"
        @input="requestFiltro()"></v-text-field>

      <v-select v-model="ordenPrecio" class="fechaFilter" label="Ordenar por precio" item-text="orden" :items="[
        { value: 'asc', orden: 'Precio ▲' },
        { value: 'des', orden: 'Precio ▼' },
      ]" @change="requestFiltroPrecio()"></v-select>
      <v-select v-model="ordenFecha" class="fechaFilter" label="Ordenar por fecha" item-text="orden" :items="[
        { value: 'asc', orden: 'Fecha ▲' },
        { value: 'des', orden: 'Fecha ▼' },
      ]" @change="requestFiltroFecha()"></v-select>

      <v-btn @click="resetearFiltro()" class="white--text" color="black"> Resetear </v-btn>
    </div>

    <div class="operaciones-section">

      <div class="entradas-section">
        <h3>Mis festivales</h3>

        <div class="noData" v-if="$store.state.showMisFestivalesList.length < 1">
          <v-icon>mdi-information</v-icon>
          <p>No has realizado ninguna compra</p>
        </div>

        <!-- <div class="spinner">
          <SpinnerComponent />
        </div> -->
        <div class="cards" v-if="$store.state.showMisFestivalesList.length > 0">

          <MisFestivalesCardComponent v-for="item in $store.state.showMisFestivalesList"
            :key="item.operacion.idOperacionEntradas" :operacion="item.operacion" :festival="item.festival" />
        </div>
      </div>
    </div>
  </v-container>
</template>
  
<script>
// import SpinnerComponent from "../components/shared/SpinnerComponent.vue";
import MisFestivalesCardComponent from "../components/MisFestivalesCardComponent.vue";

export default {
  name: "MisFestivalesComponent",
  components: {
    // SpinnerComponent,
    MisFestivalesCardComponent,
  },
  data() {
    return {
      search: "",
      ordenPrecio: null,
      ordenFecha: null,
    };
  },
  async created() {
    await this.$store.dispatch("getOperacionesUsuario");
  },
  methods: {
    async requestFiltro() {
      await this.$store.dispatch("requestFiltroOperaciones", {
        stringBuscar: this.search,
        ordenPrecio: this.ordenPrecio,
        ordenFecha: this.ordenFecha,
      });
    },
    requestFiltroPrecio(){
      this.ordenFecha = null;
      this.requestFiltro();
    },
    requestFiltroFecha(){
      this.ordenPrecio = null;
      this.requestFiltro();
    },
    resetearFiltro() {
      this.search = "";
      this.ordenPrecio = null;
      this.ordenFecha = null;
      this.requestFiltro();
    },
  },
};
</script>
  
<style lang="scss" scoped>
.spinner {
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 60px 0;
  padding: 0 40px;

  .v-icon {
    margin-right: 12px;
  }

  p {
    margin-bottom: 0;
    font-size: 22px;
    color: gray;
  }
}

.operaciones-container {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .filtro-section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 120px;
    padding: 0px 10% 0px;
    justify-content: center;

    .buscador {
      width: 70%;
      margin: 0 5%;
      margin-bottom: 20px;
    }

    .precioFilter {
      width: calc(50% - 100px);
      margin-right: 20px;
    }

    .fechaFilter {
      width: calc(50% - 100px);
      margin-right: 20px;
    }

    .v-btn {
      width: 110px;
      margin-top: 12px;
      // margin-left: 20px;
    }
  }

  .operaciones-section {
    // height: 100%;
    padding: 20px;


    .entradas-section {
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      h3 {
        width: 100%;
        margin: 20px 0;
        font-size: 24px;
      }

      .cards{
        width: 100%;
      }

    }


  }
}

@media only screen and (max-width: 600px) {
  .operaciones-container {
    .filtro-section {
      .buscador {
        width: 100%;
        margin: 0 0 20px 0;
      }

      .precioFilter {
        width: 100%;
        margin-right: 0;
      }

      .fechaFilter {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
      }

    }

  }
}
</style>