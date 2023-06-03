<template>
  <v-container class="carrito-container">
    <div class="filtro-section">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
        class="buscador"
      ></v-text-field>

      <v-select
        v-model="mes"
        class="mesesFilter"
        label="Categorías"
        :items="[
          'Todas las categorías',
          'Rock',
          'Pop',
          'Flamenco',
          'Jazz',
          'Musical',
          'Opera',
        ]"
        multiple
      ></v-select>
      <v-select
        v-model="ordenPrecio"
        class="precioFilter"
        label="Ordenar por precio"
        item-text="orden"
        :items="[
          { value: 'asc', orden: 'Precio ascendente' },
          { value: 'des', orden: 'Precio descendente' },
        ]"
      ></v-select>

      <v-btn> Resetear </v-btn>
    </div>

    <div class="entradas-section">
      <h2>Entradas</h2>
      <EntradaCarrito
        :key="$store.state.showEventList[1].idFestival"
        :id="$store.state.showEventList[1].idFestival"
        :titulo="$store.state.showEventList[1].nombre"
        :artistas="$store.state.showEventList[1].artistas"
        :descripcion="$store.state.showEventList[1].descripcion"
        :localidad="$store.state.showEventList[1].localidad"
        :mes="$store.state.showEventList[1].mes"
        :precio="$store.state.showEventList[1].precioEntrada"
        :precioVip="$store.state.showEventList[1].precioEntradaVip"
        :fecha="$store.state.showEventList[1].fecha"
      />
      <!-- <EntradaCarrito
        v-for="festival in $store.state.showEventList"
        :key="festival.idFestival"
        :id="festival.idFestival"
        :titulo="festival.nombre"
        :artistas="festival.artistas"
        :descripcion="festival.descripcion"
        :localidad="festival.localidad"
        :mes="festival.mes"
        :precio="festival.precioEntrada"
        :precioVip="festival.precioEntradaVip"
        :fecha="festival.fecha"
      /> -->
    </div>
    <div class="productos-section">
      <h2>Productos</h2>
      <ProductoCarrito
        v-for="festival in $store.state.showEventList"
        :key="festival.idFestival"
        :id="festival.idFestival"
        :titulo="festival.nombre"
        :descripcion="festival.descripcion"
        :precio="festival.precioEntrada"
      />
      <!-- <ProductoCarrito
        :key="$store.state.showEventList[1].idFestival"
        :id="$store.state.showEventList[1].idFestival"
        :titulo="$store.state.showEventList[1].nombre"
        :descripcion="$store.state.showEventList[1].descripcion"
        :precio="$store.state.showEventList[1].precioEntrada"
      /> -->
    </div>
  </v-container>
</template>

<script>
import ProductoCarrito from "../components/carrito/ProductoCarrito.vue";
import EntradaCarrito from "../components/carrito/EntradaCarrito.vue";

export default {
  name: "CarritoComponent",
  components: {
    ProductoCarrito,
    EntradaCarrito,
  },
  data() {
    return {
      search: "",
      mes: null,
      ordenPrecio: null,
    };
  },
  async mounted() {
    this.$store.dispatch("cargarFestivales");
  },
  methods: {
    async buscar() {
      this.$store.dispatch("buscar", this.search);
    },
    async requestFiltro() {
      this.$store.dispatch("requestFiltroHome", {
        mes: this.mes,
        ordenPrecio: this.ordenPrecio,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.carrito-container {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .filtro-section {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0px 10%;

    .buscador {
      width: 70%;
      margin: 0 5%;
      margin-bottom: 20px;
    }

    .mesesFilter {
      width: calc(50% - 100px);
      margin-right: 20px;
    }

    .precioFilter {
      width: calc(50% - 100px);
      margin-left: 20px;
    }

    .v-btn {
      width: 110px;
      margin-top: 12px;
      margin-left: 40px;
    }
  }

  .entradas-section,
  .productos-section {
    margin-top: 40px;
    h2 {
      color: blue;
      text-transform: uppercase;
      font-size: 24px;
      padding: 0 40px;
      margin-bottom: 20px;
      width: 100%;
    }
    .card-component {
      margin: 20px;
    }
  }
  .productos-section {
    display: flex;
    flex-wrap: wrap;
  }

  .btn-buscar {
    width: 80px;
    margin-left: 40px;
    padding: 0;
  }

  .btn-filtrar {
    padding: 0;
    margin-right: 100%;
  }
}

@media only screen and (min-width: 1024px) {
  .carrito-container {
  }
}
</style>