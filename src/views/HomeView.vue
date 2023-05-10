<template>
  <v-container class="home-container">
    <div class="carousel-section">
      <v-carousel height="auto">
        <v-carousel-item
          src="../photo/mejores-eventos-festivales-musica-electronica-mundo-primavera-verano-defqon-1-festival.jpg"
          cover></v-carousel-item>

        <v-carousel-item src="../photo/R.jpeg" cover></v-carousel-item>

        <v-carousel-item src="../photo/TURISMOFESTIVALESESPAÑA1.jpg" cover></v-carousel-item>
      </v-carousel>

      <button>
        <p>Comprar entradas</p>
      </button>
    </div>

    <div class="merchandising-section">
      <h3>Merchandising</h3>

      <div>
        <div class="left-section">
          <img src="../photo/574545117a6eccda0a795e0855f7b340.jpg" />
        </div>

        <div class="right-section">
          <p>¡Entra en nuestra tienda y consigue el Merchandising oficial de tus festivales favoritos!</p>
          <p>Encontrarás una amplia variedad de productos que harán que tu experiencia sea una verdadera EXPERIENCIA FEST.</p>
          <p>¡Ofertas exclusivas, rebajas y regalos que no encontrarás en otras webs!</p>
          <p>No lo pienses y consíguelos antes de que se agoten.</p>
          <p>¡Stock limitado!</p>

          <v-btn> Ver tienda </v-btn>
        </div>
      </div>
    </div>

    <div class="festival-section">
      <h3>Festivales</h3>

      <div class="buscador-container">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details
          class="buscador"></v-text-field>
      </div>

      <v-select v-model="genero" class="categoriasFilter" label="Categorías" :items="[
        'Todas las categorías',
        'Rock',
        'Pop',
        'Flamenco',
        'Jazz',
        'Musical',
        'Opera',
      ]" multiple></v-select>
      <v-select v-model="ordenPrecio" class="precioFilter" label="Ordenar por precio" item-text="orden" :items="[
        { value: 'asc', orden: 'Precio ascendente' },
        { value: 'des', orden: 'Precio descendente' },
      ]"></v-select>

      <v-btn> Resetear </v-btn>
    </div>

    <CardComponent v-for="evento in $store.state.showEventList" :key="evento.idEvento" :id="evento.idEvento"
      :titulo="evento.nombre" :cantante="evento.cantante" :descripcion="evento.descripcion" :localidad="evento.localidad"
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
  top: 77%;
  color: black;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 50px;
  font-weight: bold;
  background-color: yellow;
  border: 5px solid black;
  border-radius: 20px;
  background: linear-gradient(180deg, rgb(217, 255, 0) 0%, rgb(247, 255, 128) 35%, rgb(255, 251, 215) 100%);
}

.left-section img {
  height: 70%;
  width: 90%;
}

.right-section button{
  margin-top: 80px;
}

.right-section p{
 
}

.carousel-section button p {
  padding-left: 10px;
  padding-right: 10px;
}

.v-carousel {
  height: calc(100vh - 84px) !important;
}

.merchandising-section {
  padding: 140px 80px 10px;
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

.merchandising-section>div {
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
  padding: 10px 40px 20px;
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

.buscador-container{
  padding: 0px 200px;
  margin-bottom: 20px;
}

.buscador {
  width: 100%;
  margin-right: 20px;
}

.categoriasFilter {
  width: 200px;
  margin-right: 40px;
  margin-left: 150px;
}

.precioFilter {
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