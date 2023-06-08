<template>
  <v-container class="home-container">
    <div class="banner">
      <div class="banner-text">
        <v-text>¡ Las mejores ofertas en productos y entradas <br />
          solo disponibles aquí y para ti !</v-text>
        <v-btn @click="scrollToSection('festival-section')">¡Compra Ya!</v-btn>
      </div>
      <img id="imgBanner1" src="../assets/banner.jpg" />
      <img id="imgBanner2" src="../assets/banner2.jpg" />
      <img id="imgBanner3" src="../assets/banner3.jpg" />
    </div>

    <div class="merchandising-section">
      <h3>Merchandising</h3>

      <div class="sections">
        <div class="left-section">
          <img src="../assets/merchandising.jpg" />
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
          <v-btn class="white--text" color="black"> Ver tienda </v-btn>
          <p>¡Stock limitado!</p>
        </div>
      </div>
    </div>

    <v-card class="top-events-card">
      <v-card-title class="top-events-title">
        ¡ Consulta los 5 eventos más vendidos aquí !
      </v-card-title>
      <v-card-actions>
        <v-btn color="black" @click="goGrafica()" class="white--text">Aquí</v-btn>
      </v-card-actions>
    </v-card>

    <div id="festival-section">
      <h3>Festivales</h3>

      <div class="filtro-section">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details class="buscador"
          @input="requestFiltro()"></v-text-field>

        <v-select v-model="mes" class="mesesFilter" label="Ordenar por mes" :items="meses"
          @change="requestFiltro()"></v-select>
        <v-select v-model="ordenFecha" class="fechaFilter" label="Ordenar por fecha" item-text="orden" :items="[
          { value: 'asc', orden: 'Fecha ▲' },
          { value: 'des', orden: 'Fecha ▼' },
        ]" @change="requestFiltro()"></v-select>

        <v-btn @click="resetearFiltro()" class="white--text" color="black"> Resetear </v-btn>
      </div>

      <div class="spinner" v-if="$store.state.loading">
        <SpinnerComponent />
      </div>
      <div class="cards-section" v-if="!$store.state.loading">
        <CardComponent v-for="festival in $store.state.showFestivalList" :key="festival.idFestival"
          :festival="festival" />
      </div>
    </div>
    <v-snackbar v-model="$store.state.mostrarMensajeDelete" :timeout="2000" color="success">
      Festival borrado correctamente
    </v-snackbar>
  </v-container>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";
import SpinnerComponent from "../components/shared/SpinnerComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    CardComponent,
    SpinnerComponent,
  },
  data: () => ({
    search: "",
    mes: null,
    meses: [
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    ordenFecha: null,
    showAllEvents: false,
    isLoading: false,
  }),
  created() {
    this.$store.dispatch("setPaginaHome", true);
    this.$store.dispatch("cargarFestivales");
  },
  destroyed() {
    this.$store.dispatch("setPaginaHome", false);
  },
  methods: {
    async requestFiltro() {
      this.$store.dispatch("requestFiltroHome", {
        stringBuscar: this.search,
        mes: this.mes,
        ordenFecha: this.ordenFecha,
      });
    },
    scrollToSection(id) {
      console.log(this.$store.state.user);
      const section = document.querySelector(`#${id}`);
      section.scrollIntoView({ behavior: "smooth" });
    },
    resetearFiltro() {
      this.search = "";
      this.mes = null;
      this.ordenFecha = null;
      this.requestFiltro();
    },
    goGrafica() {
      this.$router.push(`/grafica`);
    }
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

.home-container {
  margin: 0;
  padding: 0;
  max-width: 100%;

  .top-events-card {
    margin: 100px auto;
    max-width: 850px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(156, 156, 156, 0.281);
    border-radius: 20px;
  }

  .top-events-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .banner {
    width: 100vw;
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;

    #imgBanner1 {
      display: none;
    }

    #imgBanner2 {
      display: none;
    }

    #imgBanner3 {
      display: block;
    }

    .banner-text {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      v-text {
        width: 100%;
        font-size: 34px;
        color: white;
        text-align: center;
        padding: 20px;
        background-color: rgba(250, 250, 250, 0.1);
        border-radius: 10px;
      }

      .v-btn {
        margin-top: 100px;
        padding: 28px;

        span {
          font-size: 20px;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .merchandising-section {
    padding: 80px 80px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    >div {
      display: flex;
      flex-wrap: wrap;
    }

    h3 {
      font-size: 28px;
      width: 100%;
      text-align: center;
      margin-bottom: 30px;
    }

    .sections {
      max-width: 1300px;

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
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 40px;
        justify-content: center;

        button {
          margin-top: 30px;
          margin-bottom: 6px;
        }

        p {
          width: 100%;
          margin-bottom: 20px;

          &:last-of-type {
            text-align: center;
          }
        }
      }
    }
  }

  #festival-section {
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
      justify-content: center;
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

      .fechaFilter {
        width: calc(50% - 100px);
        margin-right: 20px;
      }

      .v-btn {
        width: 110px;
        margin-top: 12px;
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
      .sections {

        .left-section,
        .right-section {
          width: calc(50% - 20px);
        }

        .left-section {
          margin-right: 40px;
        }

        .right-section {
          margin-top: 0;

          p {
            margin-bottom: 20px;
          }
        }
      }
    }

    #festival-section {
      padding: 80px 0 20px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .home-container {
    .banner {
      .banner-text {
        margin-top: 84px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    #festival-section {
      .filtro-section {
        .buscador {
          width: 100%;
          margin: 0 0 20px 0;
        }
        .mesesFilter {
          width: 100%;
          margin-right: 0;
        }

        .fechaFilter {
          width: 100%;
          margin-right: 0;
        }

      }
    }

  }
}

@media only screen and (max-width: 480px) {
  .home-container {
    .banner {
      .banner-text {
        v-text {
          font-size: 25px !important;
        }

        .v-btn {
          margin-top: 60px;
          padding: 28px;

          span {
            font-size: 20px;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// para ajustar la imagen principal
@media only screen and (min-width: 450px) {
  .home-container {
    .banner {
      #imgBanner1 {
        display: none;
      }

      #imgBanner2 {
        display: block;
      }

      #imgBanner3 {
        display: none;
      }
    }
  }
}

@media only screen and (min-width: 850px) {
  .home-container {
    .banner {
      #imgBanner1 {
        display: block;
      }

      #imgBanner2 {
        display: none;
      }

      #imgBanner3 {
        display: none;
      }
    }
  }
}
</style>
