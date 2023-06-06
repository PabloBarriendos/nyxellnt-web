<template>
  <div class="card-component">
    <div class="titulo">
      <v-card-title>
        {{ titulo }}
      </v-card-title>
    </div>
    <div class="card-body">
      <div class="symbol-ok">
        <v-checkbox v-model="isChecked" color="success"></v-checkbox>
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
              <div class="estandar">
                <v-text>Estándar: </v-text>
                <v-text-field
                  v-model="numberValue"
                  :persistent-hint="true"
                  hide-details
                  single-line
                  type="number"
                />
              </div>
              <div class="vip">
                <v-text>VIP: </v-text>
                <v-text-field
                  v-model="numberValueVip"
                  hide-details
                  single-line
                  type="number"
                />
              </div>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
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
  },
  data: () => ({
    numberValue: 1,
    numberValueVip: 0,
  }),
  methods: {},
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
          padding: 0;

          .estandar, .vip {
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
