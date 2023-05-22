<template>
  <div class="card-component">
    <v-card-title>
      {{ titulo }}
    </v-card-title>
    <v-card class="tarjeta" variant="tonal">
      <div class="izquierda">
        <img src="../photo/R.jpeg" />
      </div>
      <div class="derecha">
        <div class="top-info">
          <div class="top-image">
            <img src="../photo/R.jpeg" />
          </div>
          <div class="top-description">
            <v-card-subtitle> {{ cantante }} - {{ genero }} </v-card-subtitle>
            <v-card-text>
              {{ descripcion }}
            </v-card-text>
          </div>
        </div>

        <div class="bottom-info">
          <div class="text-info">
            <v-card-text>
              <span>Localidad: </span>
              <span>{{ localidad }}</span>
            </v-card-text>
            <v-card-text>
              <span>Fecha: </span>
              <span>{{ fecha }}</span>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio estándar: </span>
              <span>{{ precio }}€</span>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio VIP: </span>
              <span>{{ precioVip }}€</span>
            </v-card-text>
          </div>

          <v-card-actions>
            <v-btn
              class="white--text"
              v-on:click="goToCompra"
              elevation="2"
              x-large
              rounded
              color="blue"
            >
              Comprar
            </v-btn>
            <v-btn
              class="white--text"
              v-on:click="goToCompra"
              elevation="2"
              x-large
              rounded
              color="blue"
            >
              Merchandising
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    titulo: String,
    cantante: String,
    descripcion: String,
    localidad: String,
    genero: String,
    precio: Number,
    precioVip: Number,
    fecha: String,
  },
  methods: {
    goToCompra() {
      if (this.$store.state.userLogged == false) {
        this.$store.dispatch("setLoginPopUp", true);
      } else {
        this.$store.dispatch("setIdEventoCompra", this.id);
        this.$router.push(`/evento`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-component {
  .v-card__title {
    font-weight: bold;
    white-space: nowrap;
  }

  .tarjeta {
    display: flex;
    padding: 20px;
    background-color: aliceblue;

    .izquierda {
      display: none;
    }

    .derecha {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;

      .top-info {
        .top-image {
          // display: none;
          display: block;
          img {
            width: 100%;
            border-radius: 4px;
          }
        }
        .v-card__subtitle {
          font-weight: bold;
        }
      }

      .bottom-info {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;

        .text-info {
          width: calc(100%);
          display: flex;
          flex-wrap: wrap;

          > .v-card__text {
            width: calc(100% / 2);
            display: flex;
            flex-wrap: wrap;

            span {
              white-space: nowrap;
            }

            span:first-of-type {
              font-weight: bold;
              margin-right: 6px;
            }

            span:nth-of-type(2) {
                width: 100%;
                // overflow: hidden;
                // text-overflow: ellipsis;
              }
          }
        }

        .v-card__actions {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          justify-content: center;

          .v-btn {
            width: 154px;
            margin: 10px 20px;
            font-size: 0.9rem;
            border-radius: 10px;
            padding: 10px;
            height: auto;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .card-component {
    .tarjeta {
      .izquierda {
        display: block;
        margin-right: 10px;

        img {
          height: 100%;
          width: 280px;
          border-radius: 4px;
        }
      }

      .derecha {
        width: 100%;
        .top-info {
          .top-image {
            display: none;
          }
        }

        .bottom-info {
          .text-info {
            width: calc(100% - 184px);

            > .v-card__text {
              width: calc(100% / 2);
            }
          }

          .v-card__actions {
            width: 154px;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1240px) {
  .card-component {
    .tarjeta {
      .izquierda {
        display: block;
        margin-right: 10px;

        img {
          height: 100%;
          width: 280px;
        }
      }

      .derecha {
        width: 100%;
        .top-info {
          .top-image {
            display: none;
          }
        }

        .bottom-info {
          .text-info {
            width: calc(100% - 184px);

            > .v-card__text {
              width: calc(100% / 2);
            }
          }

          .v-card__actions {
            width: 154px;
          }
        }
      }
    }
  }
}

</style>