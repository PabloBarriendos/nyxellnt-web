<template>
  <div class="cardComponent">
    <v-card class="operacion-card" variant="tonal" @click="clickOperacion">
      <v-card-title>
        {{ festival.nombre }}
      </v-card-title>
      <div class="datosCompra">
        <v-card-text class="fechaCompra">
          Comprado: {{ operacion.fechaCompra }}
        </v-card-text>
        <v-card-text class="fechaCompra">
          Precio total: {{ operacion.precioTotalEntradas }} €
        </v-card-text>
      </div>
    </v-card>
    <v-card v-if="showTarjeta" class="tarjeta" variant="tonal">
      <div class="izquierda">
        <img :src="festival.imagen" />
      </div>
      <div class="derecha">
        <div class="top-info">
          <div class="top-image">
            <img :src="festival.imagen" />
          </div>
          <div class="top-description">
            <v-card-subtitle>
              {{ festival.artistas }} - {{ festival.mes }}
            </v-card-subtitle>
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
              <span>Entradas: </span>
              <span>{{ operacion.numEntradasCompradas }}</span>
            </v-card-text>
            <v-card-text class="text-precio">
              <span>Entradas VIP: </span>
              <span>{{ operacion.numEntradasVipCompradas }}</span>
            </v-card-text>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import OperacionEntradas from '@/models/operacionEntradas-model.js';
import Festival from '@/models/festival-model.js';

export default {
  data: () => ({
    showTarjeta: false
  }),
  props: {
    operacion: OperacionEntradas,
    festival: Festival
  },
  methods: {
    clickOperacion(){
      this.showTarjeta = !this.showTarjeta;
    }
  }
};
</script>

<style lang="scss" scoped>

.cardComponent{
  width: 100%;
  .operacion-card {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px;
    margin: 10px 0;
    background-color: white;
    z-index: 1;
  
    .v-card__title {
      word-break: break-word;
      padding: 0;
      width: 100%;
    }
  
    >div {
      .v-card__text {
        padding: 0;
        width: 100%;
        font-size: 16px;
      }
    }
  
  }
  
  .tarjeta {
    display: flex;
    padding: 20px;
    margin-top: -10px;
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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
      }
    }
  }
}


@media only screen and (min-width: 600px) {

  .cardComponent{
    .operacion-card {
      flex-wrap: nowrap;
  
      .v-card__title {
        padding: 0;
      }
  
      >div {
        display: flex;
  
        .v-card__text {
          padding: 0;
          width: auto;
          margin: 0 10px;
          white-space: nowrap;
        }
      }
  
    }
  }
}

@media only screen and (min-width: 1024px) {
  .cardComponent {
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
  .cardComponent {
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