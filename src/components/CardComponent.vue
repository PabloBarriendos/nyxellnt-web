<template>
  <div class="card-component">
    <div class="titulo">
      <v-card-title>
        {{ titulo }}
      </v-card-title>
      <v-icon v-if="this.$store.state.user.rol == 'admin'" color="primary">mdi-pencil</v-icon>
      <v-icon v-if="this.$store.state.user.rol == 'admin'" color="red" @click="deletePopUp()">mdi-delete</v-icon>
    </div>
    <v-card class="tarjeta" variant="tonal">
      <div class="izquierda">
        <img :src="this.imagen" />
      </div>
      <div class="derecha">
        <div class="top-info">
          <div class="top-image">
            <img :src="this.imagen" />
          </div>
          <div class="top-description">
            <v-card-subtitle> {{ artistas }} - {{ mes }} </v-card-subtitle>
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
            >
              Comprar
            </v-btn>
            <v-btn
              class="white--text"
              v-on:click="goToCompra"
              elevation="2"
              x-large
              rounded
            >
              Merchandising
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
    <v-dialog
      v-model="showDeletePopUp"
      persistent
      width="400"
    >
      <v-card class="popupDelete">
        <v-card-text>
          <span class="text-h5"
            >¿Estas seguro de que deseas eliminar este evento?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" variant="text" v-on:click="deleteFestival()"
            >Aceptar</v-btn
          >
          <v-btn
            color="error"
            variant="text"
            @click="cerrarDeletePopUp"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDeletePopUp: false,
  }),
  props: {
    id: Number,
    titulo: String,
    artistas: String,
    descripcion: String,
    localidad: String,
    mes: String,
    precio: Number,
    precioVip: Number,
    fecha: String,
    imagen: String,
  },
  methods: {
    goToCompra() {
      if (this.$store.state.userLogged == false) {
        // this.$store.dispatch("setLoginPopUp", true);
        this.$router.push(`/carrito`);
      } else {
        this.$store.dispatch("setIdFestivalCompra", this.id);
        // this.$router.push(`/festival`);
        this.$router.push(`/carrito`);
      }
    },
    deleteFestival() {
      this.$store.dispatch("deleteFestivalCompra", this.id);
      // this.$store.dispatch("cargarFestivales");
      this.showDeletePopUp = false;
    },
    deletePopUp() {
      this.showDeletePopUp = true;
    },
    cerrarDeletePopUp() {
      this.showDeletePopUp = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.popupDelete {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-component {
  .titulo {
    display: flex;

    .v-card__title {
      font-weight: bold;
      white-space: nowrap;
      width: calc(100% - 88px);
    }

    .v-icon {
      margin: 0 10px;
    }
  }

  .tarjeta {
    display: flex;
    padding: 20px;
    background-color: rgba(200, 200, 200, 0.3);

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
            background-color: black;
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
