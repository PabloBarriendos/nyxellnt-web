<template>
  <div class="card-component">
    <!-- <v-card-title>
      {{ titulo }}
    </v-card-title> -->
    <div class="symbol-ok">
      <v-icon color="green darken-2">mdi-check-circle</v-icon>
    </div>
    <v-card class="tarjeta" variant="tonal">
      <div class="top-info">
        <div class="top-image">
          <img src="../../photo/R.jpeg" />
        </div>
        <div class="top-description">
          <v-card-text>
            {{ descripcion }}
          </v-card-text>
        </div>
      </div>

      <div class="bottom-info">
        <div class="text-info">
          <v-card-text class="text-precio">
            <span>Precio: </span>
            <span>{{ precio }}€</span>
          </v-card-text>
        </div>

        <v-card-actions>
          <v-text-field
            v-model="numberValue"
            :persistent-hint="true"
            hide-details
            single-line
            type="number"
          />
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";

export default {
  props: {
    id: Number,
    titulo: String,
    descripcion: String,
    precio: Number,
  },
  data: () => ({
    numberValue: 1,
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
.card-component {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;

  .v-card__title {
    width: 100%;
    font-weight: bold;
    white-space: nowrap;
    padding-left: 60px;
  }

  .symbol-ok {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tarjeta {
    width: calc(100% - 60px);
    display: flex;
    padding: 20px;
    background-color: aliceblue;
    align-items: flex-start;
    flex-direction: column;

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

      .text-info {
        width: calc(100%);
        display: flex;
        flex-wrap: wrap;

        > .v-card__text {
          width: calc(100% / 2);
          display: flex;

          span {
            white-space: nowrap;
          }

          span:first-of-type {
            font-weight: bold;
            margin-right: 6px;
          }

          span:nth-of-type(2) {
            width: 100%;
          }
        }
      }

      .v-card__actions {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;

        .v-input {
          background-color: white;
          width: 154px;
        }
      }
    }
  }
}

// @media only screen and (min-width: 1024px) {
//   .card-component {
//     .tarjeta {
//       .izquierda {
//         display: block;
//         margin-right: 10px;

//         img {
//           height: 100%;
//           width: 280px;
//           border-radius: 4px;
//         }
//       }

//       .derecha {
//         width: 100%;
//         .top-info {
//           .top-image {
//             display: none;
//           }
//         }

//         .bottom-info {
//           .text-info {
//             width: calc(100% - 184px);

//             > .v-card__text {
//               width: calc(100% / 2);
//             }
//           }

//           .v-card__actions {
//             width: 154px;
//           }
//         }
//       }
//     }
//   }
// }

// @media only screen and (min-width: 1240px) {
//   .card-component {
//     .tarjeta {
//       .izquierda {
//         display: block;
//         margin-right: 10px;

//         img {
//           height: 100%;
//           width: 280px;
//         }
//       }

//       .derecha {
//         width: 100%;
//         .top-info {
//           .top-image {
//             display: none;
//           }
//         }

//         .bottom-info {
//           .text-info {
//             width: calc(100% - 184px);

//             > .v-card__text {
//               width: calc(100% / 2);
//             }
//           }

//           .v-card__actions {
//             width: 154px;
//           }
//         }
//       }
//     }
//   }
// }
</style>