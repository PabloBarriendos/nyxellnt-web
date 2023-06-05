<template>
  <div class="card-component">
    <div class="titulo">
      <v-card-title v-if="!showEditar">
        {{ titulo }}
      </v-card-title>
      <textarea v-if="showEditar" id="editTitulo" v-model="tituloEditar">
      </textarea>
      <v-btn
        class="white--text"
        v-on:click="editarFestival"
        elevation="2"
        x-large
        rounded
      >
        Guardar
      </v-btn>
      <v-btn
        class="white--text"
        v-on:click="showEditar == false"
        elevation="2"
        x-large
        rounded
      >
        Descartar
      </v-btn>
      <v-icon
        v-if="this.$store.state.user.rol == 'admin'"
        color="primary"
        @click="openEditar()"
        >mdi-pencil</v-icon
      >
      <v-icon
        v-if="this.$store.state.user.rol == 'admin'"
        color="red"
        @click="deletePopUp()"
        >mdi-delete</v-icon
      >
    </div>
    <v-card class="tarjeta" variant="tonal">
      <div class="izquierda">
        <img :src="'data:image/png;base64,' + this.imagen" />
      </div>
      <div class="derecha">
        <div class="top-info">
          <div class="top-image">
            <img :src="'data:image/png;base64,' + this.imagen" />
          </div>
          <div class="top-description">
            <v-card-subtitle v-if="!showEditar">
              {{ artistas }} - {{ mes }}
            </v-card-subtitle>
            <textarea
              v-if="showEditar"
              id="editArtistas"
              v-model="artistasEditar"
            >
            </textarea>
            <v-card-subtitle class="separadorEdit" v-if="showEditar">
              -
            </v-card-subtitle>
            <textarea v-if="showEditar" id="editMes" v-model="mesEditar">
            </textarea>
            <v-card-text v-if="!showEditar">
              {{ descripcion }}
            </v-card-text>
            <textarea
              v-if="showEditar"
              id="editDescripcion"
              v-model="descripcionEditar"
            >
            </textarea>
          </div>
        </div>

        <div class="bottom-info">
          <div class="text-info">
            <v-card-text>
              <span>Localidad: </span>
              <span v-if="!showEditar">{{ localidad }}</span>
              <textarea
                v-if="showEditar"
                id="editLocalidad"
                v-model="localidadEditar"
              >
              </textarea>
            </v-card-text>
            <v-card-text>
              <span>Fecha: </span>
              <span v-if="!showEditar">{{ fecha }}</span>
              <textarea v-if="showEditar" id="editFecha" v-model="fechaEditar">
              </textarea>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio estándar: </span>
              <span v-if="!showEditar">{{ precio }}€</span>
              <textarea
                v-if="showEditar"
                id="editPrecio"
                v-model="precioEditar"
              >
              </textarea>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio VIP: </span>
              <span v-if="!showEditar">{{ precioVip }}€</span>
              <textarea
                v-if="showEditar"
                id="editPrecioVip"
                v-model="precioVipEditar"
              >
              </textarea>
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
    <v-dialog v-model="showDeletePopUp" persistent width="400">
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
          <v-btn color="error" variant="text" @click="cerrarDeletePopUp"
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
    showEditar: false,
    tituloEditar: String,
    artistasEditar: String,
    descripcionEditar: String,
    localidadEditar: String,
    mesEditar: String,
    precioEditar: Number,
    precioVipEditar: Number,
    fechaEditar: String,
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
  created() {
    this.tituloEditar = this.titulo;
    this.artistasEditar = this.artistas;
    this.descripcionEditar = this.descripcion;
    this.localidadEditar = this.localidad;
    this.mesEditar = this.mes;
    this.precioEditar = this.precio;
    this.precioVipEditar = this.precioVip;
    this.fechaEditar = this.fecha;
  },
  methods: {
    openEditar() {
      this.showEditar = true;
    },
    editarFestival() {
      
    },
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

textarea {
  resize: none;
  height: 34px;
  border: 1px solid black;
  padding: 4px;
  width: calc(100% - 8px);
  margin: 0 8px 0 0;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;

  &#editTitulo {
    width: calc(100% - 16px);
    margin: 16px 16px 16px 0;
    font-weight: bold;
  }

  &#editArtistas {
    width: calc(100% - 152px);
    margin: 16px;
    margin-bottom: 0;
    font-weight: bold;
  }

  &#editMes {
    margin: 16px;
    margin-top: 0;
    width: 120px;
    font-weight: bold;
  }

  &#editDescripcion {
    width: calc(100% - 32px);
    height: 120px;
    margin: 0 16px 0 16px;
  }
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
        width: 100%;

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

          &.separadorEdit {
            padding: 0 0 0 16px;
          }
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
