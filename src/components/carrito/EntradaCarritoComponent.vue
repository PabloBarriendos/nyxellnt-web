<template>
  <div class="card-component">
    <div class="titulo">
      <v-card-title>
        {{ festival.titulo }}
      </v-card-title>
      <v-icon class="iconDelete" color="error" @click="deleteFestivalCarrito()">mdi-delete</v-icon>
    </div>
    <div class="card-body">
      <div class="icons">
        <v-checkbox v-model="isChecked" color="success"></v-checkbox>
      </div>
      <v-card class="tarjeta" variant="tonal">
        <div class="izquierda">
          <img :src="festival.imagen" />
        </div>
        <div class="derecha">
          <div class="top-info">
            <div class="top-image">
              <img :src="festival.imagen" />
            </div>
            <div class="top-description">
              <v-card-subtitle> {{ festival.artistas }} - {{ festival.mes }} </v-card-subtitle>
              <v-card-text>
                {{ festival.descripcion }}
              </v-card-text>
            </div>
          </div>

          <div class="bottom-info">
            <div class="text-info">
              <v-card-text>
                <span>Localidad: </span>
                <span>{{ festival.localidad }}</span>
              </v-card-text>
              <v-card-text>
                <span>Fecha: </span>
                <span>{{ festival.fecha }}</span>
              </v-card-text>
              <v-card-text class="text-precio">
                <span>Precio estándar: </span>
                <span>{{ festival.precioEntrada }}€</span>
              </v-card-text>
              <v-card-text class="text-precio">
                <span>Precio VIP: </span>
                <span>{{ festival.precioEntradaVip }}€</span>
              </v-card-text>
            </div>

            <v-card-actions>
              <div class="estandar">
                <v-text name="precioEstandar">Estándar: </v-text>
                <v-text-field v-model="numberValue" :persistent-hint="true" :min="0" :max="maxEntradas" hide-details
                  single-line type="number" @input="modificarNumEntradas" />
              </div>
              <div class="vip">
                <v-text name="precioVip">VIP: </v-text>
                <v-text-field v-model="numberValueVip" :min="0" :max="maxEntradasVip" hide-details single-line
                  type="number" @input="modificarNumEntradas" />
              </div>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Festival from '@/models/festival-model.js';

export default {
  props: {
    festival: Festival
  },
  data: () => ({
    isChecked: false,
    numberValue: 1,
    numberValueVip: 0,

    maxEntradas: 5,
    maxEntradasVip: 5,
  }),
  created() {
    if (this.festival.stock < 5) {
      this.maxEntradas = this.festival.stock;
    }
    if (this.festival.stockVip < 5) {
      this.maxEntradasVip = this.festival.stockVip;
    }

    this.listaEntradasCarrito = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
    this.listaEntradasCarrito.forEach(item => {
      if(item.festival.idFestival == this.festival.idFestival){
        this.numberValue = item.entradas;
        this.numberValueVip = item.entradasVip;
      }
    });
  },
  methods: {
    modificarNumEntradas() {
      this.numberValue = this.numberValue > 5 ? 5 : this.numberValue < 0 ? 0 : this.numberValue;
      this.numberValueVip = this.numberValueVip > 5 ? 5 : this.numberValueVip < 0 ? 0 : this.numberValueVip;

      let listaEntradasStorage = JSON.parse(localStorage.getItem('listaEntradasCarrito'));

      console.log('numEntradas', this.numberValue);
      console.log('numEntradasVip', this.numberValueVip);
      console.log('', listaEntradasStorage);

      listaEntradasStorage.forEach(item => {
        if (item.festival.idFestival == this.festival.idFestival) {
          item.entradas = parseInt(this.numberValue);
          item.entradasVip = parseInt(this.numberValueVip);
        }
      });

      localStorage.setItem('listaEntradasCarrito', JSON.stringify(listaEntradasStorage));

      this.$emit('changedEntradas', true);

    },
    deleteFestivalCarrito() {
      const listaEntradasStorage = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
      const indiceEntradaBorrar = listaEntradasStorage.findIndex(item => item.festival.idFestival === this.festival.idFestival);

      if (indiceEntradaBorrar !== -1) {
        listaEntradasStorage.splice(indiceEntradaBorrar, 1);
      }
      localStorage.setItem('listaEntradasCarrito', JSON.stringify(listaEntradasStorage));

      this.$emit('deletedEntradaCarrito', true);
    }
  },
};
</script>

<style lang="scss" scoped>
.card-component {
  .card-body {
    display: flex;
    align-items: center;

  }

  .titulo {
    display: flex;

    .v-card__title {
      font-weight: bold;
      white-space: nowrap;
      width: calc(100% - 52px);
    }

    .iconDelete {
      margin: 10px;
      font-size: 32px;
    }
  }

  .tarjeta {
    display: flex;
    padding: 20px;
    width: calc(100% - 44px);
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

          >.v-card__text {
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
          padding: 0;

          .estandar,
          .vip {
            width: calc(100% / 2);
            display: flex;
            flex-wrap: wrap;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.375rem;
            letter-spacing: 0.0071428571em;
            padding: 16px;

            v-text {
              font-weight: bold;
              white-space: nowrap;
            }

            .v-input {
              width: 100%;
            }
          }

          // .vip {
          //   width: calc(100% / 2);
          //   display: flex;
          //   flex-wrap: wrap;
          // }
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

            .estandar,
            .vip {
              width: 100%;
            }
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
</style>
