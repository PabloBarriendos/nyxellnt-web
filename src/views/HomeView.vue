<template>
  <v-container class="home-container">
    <div class="carousel-section">
      <v-carousel>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>

      <button><p>Comprar entradas</p></button>
    </div>

    <div class="merchandising-section">
      <h3>Merchandising</h3>

      <div>
        <div class="left-section">
          <img src="" alt="" />
        </div>

        <div class="right-section">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            omnis harum alias? Natus exercitationem error eum magni ipsa
            consequatur doloribus minus praesentium rerum delectus laborum
            commodi, est hic sint illum!
          </p>

          <v-btn> Ver tienda </v-btn>
        </div>
      </div>
    </div>

    <div class="festival-section">
      <h3>Festivales</h3>

      <div class="buscador-container">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          class="buscador"
        ></v-text-field>
      </div>

      <v-select
        v-model="genero"
        class="categoriasFilter"
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

    <CardComponent
      v-for="evento in $store.state.showEventList"
      :key="evento.idEvento"
      :id="evento.idEvento"
      :titulo="evento.nombre"
      :cantante="evento.cantante"
      :descripcion="evento.descripcion"
      :localidad="evento.localidad"
      :genero="evento.categoria"
      :precio="evento.precioEntrada"
      :fecha="evento.fecha"
    />
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
      ordenPrecio: null,
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
      this.$store.dispatch("requestFiltroHome", {
        genero: this.genero,
        ordenPrecio: this.ordenPrecio,
      });
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

.carousel-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-section button {
  position: absolute;
  color: white;
  font-family: cursive;
  font-size: 28px;
  font-weight: bold;
}

.v-carousel {
  height: calc(100vh - 84px) !important;
}

.merchandising-section {
  padding: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.merchandising-section h3 {
  font-size: 28px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.merchandising-section > div {
  display: flex;
}
.merchandising-section .left-section,
.merchandising-section .right-section {
  width: 50%;
}
.merchandising-section .left-section {
  margin-right: 20px;
}
.merchandising-section .right-section p {
  margin-bottom: 20px;
}

.festival-section {
  padding: 80px 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.festival-section h3 {
  font-size: 28px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.festival-section .buscador-container {
  width: 100%;
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