<template>
  <v-container class="carrito-container">
    <h1>Carrito</h1>
    <div class="btn-comprar">
      <v-btn color="success" variant="text" v-on:click="finalizarCompra()">
        <v-icon>mdi-cart</v-icon> Finalizar Compra
      </v-btn>
    </div>
    <div class="entradas-section">
      <h2>Entradas</h2>
      <EntradaCarritoComponent
        v-for="festival in listaEntradasCarrito"
        :key="festival.idFestival"
        :festival="festival"
      />
      <!-- <EntradaCarritoComponent
        v-for="festival in [$store.state.showFestivalList[1]]"
        :key="festival.idFestival"
        :festival="festival"
      /> -->
    </div>
    <div class="productos-section">
      <h2>Productos</h2>
      <!-- <ProductoCarritoComponent
        v-for="festival in $store.state.showFestivalList"
        :key="festival.idFestival"
        :id="festival.idFestival"
        :titulo="festival.nombre"
        :descripcion="festival.descripcion"
        :precio="festival.precioEntrada"
      /> -->
      <!-- <ProductoCarritoComponent
        :key="$store.state.showFestivalList[1].idFestival"
        :id="$store.state.showFestivalList[1].idFestival"
        :titulo="$store.state.showFestivalList[1].nombre"
        :descripcion="$store.state.showFestivalList[1].descripcion"
        :precio="$store.state.showFestivalList[1].precioEntrada"
        :imagen="$store.state.showFestivalList[1].imagen"
      /> -->
    </div>
  </v-container>
</template>

<script>
import EntradaCarritoComponent from "../components/carrito/EntradaCarritoComponent.vue";
// import ProductoCarritoComponent from "../components/carrito/ProductoCarritoComponent.vue";

export default {
  name: "CarritoComponent",
  components: {
    EntradaCarritoComponent,
    // ProductoCarritoComponent,
  },
  data: () => ({
    listaEntradasCarrito: []
  }),
  created() {
    const listaEntradasStorage = localStorage.getItem('listaEntradasCarrito');
    this.listaEntradasCarrito = JSON.parse(listaEntradasStorage);
    
  },
  methods: {
    finalizarCompra(){
      // todo
    }
  },
};
</script>

<style lang="scss" scoped>
.carrito-container {
  margin: 0;
  padding: 0;
  max-width: 100%;
  margin-top: 160px;

  h1{
    width: 100%;
    text-align: center;
    font-size: 54px;
  }
  .btn-comprar{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 40px 0;
    .v-btn{
      padding: 24px;

      .v-icon{
        margin-right: 10px;
      }
    }
  }

  .entradas-section,
  .productos-section {
    margin-top: 40px;
    h2 {
      color: black;
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