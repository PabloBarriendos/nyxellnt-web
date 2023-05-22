<template>
  <v-container class="home-container">
    <div class="carousel-section">
      <v-carousel height="auto">
        <v-carousel-item
          src="../photo/mejores-eventos-festivales-musica-electronica-mundo-primavera-verano-defqon-1-festival.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item src="../photo/R.jpeg" cover></v-carousel-item>

        <v-carousel-item
          src="../photo/TURISMOFESTIVALESESPAÑA1.jpg"
          cover
        ></v-carousel-item>
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
          <p>
            ¡Entra en nuestra tienda y consigue el Merchandising oficial de tus
            festivales favoritos!
          </p>
          <p>
            Encontrarás una amplia variedad de productos que harán que tu
            experiencia sea una verdadera EXPERIENCIA FEST.
          </p>
          <p>
            ¡Ofertas exclusivas, rebajas y regalos que no encontrarás en otras
            webs!
          </p>
          <p>No lo pienses y consíguelos antes de que se agoten.</p>
          <p>¡Stock limitado!</p>

          <v-btn> Ver tienda </v-btn>
        </div>
      </div>
    </div>

    <div class="festival-section">
      <h3>Festivales</h3>

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

      <div class="cards-section">
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
          :precioVip="evento.precioEntradaVip"
          :fecha="evento.fecha"
        />
      </div>
    </div>
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

<style lang="scss" scoped>
.home-container {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .carousel-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .v-carousel {
      height: calc(100vh - 84px) !important;
    }

    button {
      position: absolute;
      top: 77%;
      color: black;
      font-family: Georgia, "Times New Roman", Times, serif;
      font-size: 50px;
      font-weight: bold;
      background-color: yellow;
      border: 5px solid black;
      border-radius: 20px;
      background: linear-gradient(
        180deg,
        rgb(217, 255, 0) 0%,
        rgb(247, 255, 128) 35%,
        rgb(255, 251, 215) 100%
      );

      p {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }

  .merchandising-section {
    padding: 140px 80px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > div {
      display: flex;
      flex-wrap: wrap;
    }

    h3 {
      font-size: 28px;
      width: 100%;
      text-align: center;
      margin-bottom: 30px;
    }

    .left-section,
    .right-section {
      width: 100%;
    }

    .left-section {
      // margin-right: 20px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .right-section {
      margin-top: 40px;
      button {
        margin-top: 20px;
      }

      p {
        margin-bottom: 20px;
      }
    }
  }

  .festival-section {
    padding: 80px 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    h3 {
      font-size: 28px;
      width: 100%;
      text-align: center;
      margin-bottom: 30px;
    }

    .filtro-section {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0px 10%;

      .buscador {
        width: 70%;
        margin: 0 5%;
        margin-bottom: 20px;
      }

      .categoriasFilter {
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

    .cards-section {
      .card-component {
        margin: 40px;
      }
    }
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
  .home-container {

    .merchandising-section {

      .left-section,
      .right-section {
        width: calc(50% - 20px);
      }

      .left-section {
        margin-right: 40px;
      }

      .right-section {
        margin-top: 0;
        button {
          margin-top: 20px;
        }

        p {
          margin-bottom: 20px;
        }
      }
    }

    .festival-section {
      padding: 80px 0 20px;
    }
  }
}
</style>