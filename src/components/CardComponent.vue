<template>
  <div class="card-component">
    <div class="titulo">
      <v-card-title v-if="!showEditar">
        {{ festival.nombre }}
      </v-card-title>
      <textarea v-if="showEditar" placeholder="Nombre del festival" id="editTitulo" v-model="festivalEditar.nombre">
      </textarea>
      <v-btn v-if="showEditar" class="white--text" color="success" v-on:click="editarFestival" elevation="2" rounded>
        Guardar
      </v-btn>
      <v-btn v-if="showEditar" color="error" class="white--text" v-on:click="closeEditar" elevation="2" rounded>
        Descartar
      </v-btn>
      <v-icon v-if="this.$store.state.user.rol == 'admin' && !showEditar" color="primary" @click="openEditar()">mdi-pencil</v-icon>
      <v-icon v-if="this.$store.state.user.rol == 'admin' && !showEditar" color="red" @click="deletePopUp()">mdi-delete</v-icon>
    </div>
    <v-card class="tarjeta" variant="tonal">
      <div class="izquierda">
        <img v-if="!showEditar" :src="festival.imagen" />
        <textarea v-if="showEditar" placeholder="Url de la imagen" id="editImagenLeft" v-model="festivalEditar.imagen">
        </textarea>
      </div>
      <div class="derecha">
        <div class="top-info">
          <div class="top-image">
            <img v-if="!showEditar" :src="festival.imagen" />
            <textarea v-if="showEditar" placeholder="Url de la imagen" id="editImagenTop" v-model="festivalEditar.imagen">
            </textarea>
          </div>
          <div class="top-description">
            <v-card-subtitle v-if="!showEditar">
              {{ festival.artistas }} - {{ festival.mes }}
            </v-card-subtitle>
            <textarea v-if="showEditar" placeholder="Artistas" id="editArtistas" v-model="festivalEditar.artistas">
            </textarea>
            <v-card-subtitle class="separadorEdit" v-if="showEditar">
              -
            </v-card-subtitle>
            <textarea v-if="showEditar" placeholder="Mes" id="editMes" v-model="festivalEditar.mes" :rules="mesRules">
            </textarea>
            <v-card-text v-if="!showEditar">
              {{ festival.descripcion }}
            </v-card-text>
            <textarea v-if="showEditar" placeholder="Descripción" id="editDescripcion" v-model="festivalEditar.descripcion">
            </textarea>
          </div>
        </div>

        <div class="bottom-info">
          <div class="text-info">
            <v-card-text>
              <span>Localidad: </span>
              <span v-if="!showEditar">{{ festival.localidad }}</span>
              <textarea v-if="showEditar" placeholder="Localidad" id="editLocalidad" v-model="festivalEditar.localidad" :rules="localidadRules">
              </textarea>
            </v-card-text>
            <v-card-text>
              <span>Fecha: </span>
              <span v-if="!showEditar">{{ festival.fecha }}</span>
              <textarea v-if="showEditar" placeholder="dd/mm/yyyy" id="editFecha" v-model="festivalEditar.fecha" :rules="fechaRules">
              </textarea>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio estándar: </span>
              <span v-if="!showEditar">{{ festival.precioEntrada }}€</span>
              <textarea v-if="showEditar" placeholder="Precio estándar" id="editPrecio" v-model="festivalEditar.precioEntrada" :rules="rulePrecio">
              </textarea>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Precio VIP: </span>
              <span v-if="!showEditar">{{ festival.precioEntradaVip }}€</span>
              <textarea v-if="showEditar" placeholder="Precio VIP" id="editPrecioVip" v-model="festivalEditar.precioEntradaVip" :rules="rulePrecioVip">
              </textarea>
            </v-card-text>
            <v-card-text v-if="showEditar">
              <span>Stock estándar: </span>
              <textarea placeholder="Stock estándar" id="editStock" v-model="festivalEditar.stock">
              </textarea>
            </v-card-text>
            <v-card-text v-if="showEditar">
              <span>Stock VIP: </span>
              <textarea placeholder="Stock VIP" id="editStockVip" v-model="festivalEditar.stockVip">
              </textarea>
            </v-card-text>
          </div>

          <v-card-actions v-if="!showEditar">
            <v-btn class="white--text" v-on:click="goToCompra" elevation="2" x-large rounded>
              Comprar
            </v-btn>
            <v-btn class="white--text" v-on:click="goToCompra" elevation="2" x-large rounded>
              Merchandising
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="showDeletePopUp" persistent width="400">
      <v-card class="popupDelete">
        <v-card-text>
          <span class="text-h5">¿Estas seguro de que deseas eliminar este evento?</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" variant="text" v-on:click="deleteFestival()">Aceptar</v-btn>
          <v-btn color="error" variant="text" @click="cerrarDeletePopUp">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Festival from '@/models/festival-model.js';

export default {
  data: () => ({
    showDeletePopUp: false,
    showEditar: false,
    festivalEditar: {},
    mesRulesRules: [
      (value) => {
        const meses = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        v => !!v || 'El campo es requerido'
        if (meses.includes(value.toLowerCase())) return true;
        return "Debe ingresar un mes válido en español.";
      },
    ],
    localidadRules: [
      (value) => {
        v => !!v || 'El campo es requerido'
        if (/^[A-Za-z]+$/.test(value)) return true;
        return "El campo solo puede contener letras.";
      },
    ],
    fechaRules: [
      (value) => {
        v => !!v || 'El campo es requerido'
        if (/^\d{2}\/\d{2}\/\d{2}$/.test(value)) return true;
        return "El formato de fecha debe ser dd/mm/aa.";
      },
    ],
    rulePrecio: [
      v => !!v || 'El campo es requerido',
      v => /^\d+$/.test(v) || 'Ingresa solo números'
    ],
    rulePrecioVip: [
      v => !!v || 'El campo es requerido',
      v => /^\d+$/.test(v) || 'Ingresa solo números'
    ],
  }),
  props: {
    festival: Festival
  },
  created() {
    this.festivalEditar = {...this.festival};
  },
  methods: {
    openEditar() {
      this.showEditar = true;
      this.festivalEditar = {...this.festival};
    },
    closeEditar() {
      this.showEditar = false;
    },
    editarFestival() {
      console.log('EDITAR', this.festivalEditar);
      this.$store.dispatch("editFestivalCompra", this.festivalEditar);
    },
    goToCompra() {
      if (this.$store.state.userLogged == false) {
        this.$store.dispatch("setLoginPopUp", true);
      } else {
        let yaExiste = false;
        let listaEntradasStorage = JSON.parse(localStorage.getItem('listaEntradasCarrito'));

        if (!listaEntradasStorage) {
          listaEntradasStorage = [];
        }
        if (listaEntradasStorage.length > 0) {
          listaEntradasStorage.forEach(item => {
            if (item.festival.idFestival == this.festival.idFestival) {
              yaExiste = true;
            }
          });
        }
        if (yaExiste == false) {
          const objetoCarrito = {
            festival: this.festival,
            entradas: 1,
            entradasVip: 0,
          }
          listaEntradasStorage.push(objetoCarrito);
        }
        localStorage.setItem('listaEntradasCarrito', JSON.stringify(listaEntradasStorage));

        this.$store.dispatch("setIdFestivalCompra", this.festival.idFestival);

        this.$router.push(`/carrito`);
      }
    },
    deleteFestival() {
      this.$store.dispatch("deleteFestivalCompra", this.festival.idFestival);
      // this.$store.dispatch("cargarFestivales");
      this.showDeletePopUp = false;
    },
    deletePopUp() {
      this.showDeletePopUp = true;
    },
    cerrarDeletePopUp() {
      this.showDeletePopUp = false;
    },
    isValidDate(day, month, year) {
      const date = new Date(year, month - 1, day);
      return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }
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

  &#editImagenLeft {
    width: 100%;
    height: calc(100% - 30px);
    margin: 15px 0;
  }
  &#editImagenTop {
    width: calc(100% - 32px);
    height: 100px;
    margin: 0 16px;
  }

  &#editArtistas {
    width: calc(100% - 32px);
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
    align-items: center;

    .v-card__title {
      font-weight: bold;
      word-break: break-word;
      width: calc(100% - 88px);
    }

    .v-btn {
      margin: 0 10px;
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

          >.v-card__text {
            width: calc(100% / 2);
            display: flex;
            flex-wrap: wrap;

            span {
              word-break: break-word;
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

            >.v-card__text {
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

            >.v-card__text {
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

@media only screen and (max-width: 540px) {
    .card-component {
        .titulo {
            flex-wrap: wrap-reverse;

            .v-btn{
                margin-left: 20px;
                margin-bottom: 8px;
            }
        }
    }
}
</style>
