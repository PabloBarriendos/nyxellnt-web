<template>
    <div class="card-component">
        <div class="titulo">
            <textarea placeholder="Nombre del festival" id="editTitulo" v-model="festival.nombre" @change="checkAdd" :rules="tituloRules">
                    </textarea>
            <v-btn :disabled="addDisabled" class="white--text" color="success" v-on:click="addFestival" elevation="2"
                rounded>
                Guardar
            </v-btn>
            <v-btn color="error" class="white--text" v-on:click="closeCard" elevation="2" rounded>
                Descartar
            </v-btn>
        </div>
        <v-card class="tarjeta" variant="tonal">
            <div class="izquierda">
                <textarea placeholder="Url de la imagen" id="editImagenLeft" v-model="festival.imagen" @change="checkAdd" :rules="imagenRulesLeft">
                          </textarea>
            </div>
            <div class="derecha">
                <div class="top-info">
                    <div class="top-image">
                        <textarea placeholder="Url de la imagen" id="editImagenTop" v-model="festival.imagen" @change="checkAdd" :rules="imagenRulesTop">
                        </textarea>
                    </div>
                    <div class="top-description">
                        <textarea placeholder="Artistas" id="editArtistas" v-model="festival.artistas" @change="checkAdd" :rules="artistasRules">
                          </textarea>
                        <v-card-subtitle class="separadorEdit">
                            -
                        </v-card-subtitle>
                        <textarea placeholder="Mes" id="editMes" v-model="festival.mes" @change="checkAdd" :rules="mesRules">
                          </textarea>
                        <textarea placeholder="Descripción" id="editDescripcion" v-model="festival.descripcion"
                            @change="checkAdd" :rules="descripcionRules">
                          </textarea>
                    </div>
                </div>

                <div class="bottom-info">
                    <div class="text-info">
                        <v-card-text>
                            <span>Localidad: </span>
                            <textarea placeholder="Localidad" id="editLocalidad" v-model="festival.localidad"
                                @change="checkAdd" :rules="localidadRules">
                            </textarea>
                        </v-card-text>
                        <v-card-text>
                            <span>Fecha: </span>
                            <textarea placeholder="dd/mm/yyyy" id="editFecha" v-model="festival.fecha" :rules="fechaRules"
                                @change="checkAdd">
                            </textarea>
                        </v-card-text>
                        <v-card-text class="text-precio">
                            <span>Precio estándar: </span>
                            <textarea placeholder="Precio estándar" id="editPrecio" v-model="festival.precioEntrada"
                                :rules="rulePrecio" @change="checkAdd">
                            </textarea>
                        </v-card-text>
                        <v-card-text class="text-precio">
                            <span>Precio VIP: </span>
                            <textarea placeholder="Precio VIP" id="editPrecioVip" v-model="festival.precioEntradaVip"
                                :rules="rulePrecioVip" @change="checkAdd">
                            </textarea>
                        </v-card-text>
                        <v-card-text>
                            <span>Stock estándar: </span>
                            <textarea placeholder="Precio estándar" id="editStock" v-model="festival.stock"
                                @change="checkAdd" :rules="stockRule">
                            </textarea>
                        </v-card-text>
                        <v-card-text>
                            <span>Stock VIP: </span>
                            <textarea placeholder="Precio VIP" id="editStockVip" v-model="festival.stockVip"
                                @change="checkAdd" :rules="stockRule">
                            </textarea>
                        </v-card-text>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>
  
<script>
import Festival from '@/models/festival-model.js';

export default {
    data: () => ({
        festival: new Festival(0, '', '', '', '', '', '', '', '', '', '', ''),
        addDisabled: true,

        rulePrecio: [
            v => !!v || 'El campo es requerido',
            v => /^\d+$/.test(v) || 'Ingresa solo números'
        ],
        rulePrecioVip: [
            v => !!v || 'El campo es requerido',
            v => /^\d+$/.test(v) || 'Ingresa solo números'
        ],
        fechaRules: [
            v => !!v || 'El campo es requerido',
            v => /^\d{2}\/\d{2}\/\d{2}$/.test(v) || 'Ingresa una fecha válida (dd/mm/aa)',
            v => {
                const parts = v.split('/');
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]);
                const year = parseInt(parts[2]);
                return this.isValidDate(day, month, year) || 'Ingresa una fecha válida (dd/mm/aa)';
            }
        ]
    }),
    created() {
    },
    methods: {
        closeCard() {
            this.$emit('closePopUp', true);
        },
        checkAdd() {
            console.log(this.festival);
            if (
                this.festival.nombre &&
                this.festival.artistas &&
                this.festival.descripcion &&
                this.festival.localidad &&
                this.festival.fecha &&
                this.festival.precioEntrada &&
                this.festival.stock &&
                this.festival.precioEntradaVip &&
                this.festival.stockVip &&
                this.festival.mes &&
                this.festival.imagen
            ) {
                console.log('EY')
                this.addDisabled = false;
            }
        },
        addFestival() {
            console.log('festival', this.festival);
            this.$store.dispatch("addFestival", this.festival);

            this.closeCard();
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

    &#editTitulo {
        width: calc(100% - 16px);
        margin: 16px 16px 16px 20px;
        font-weight: bold;
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
    margin-top: 100px;

    .titulo {
        display: flex;
        align-items: center;
        background-color: white;
        padding: 20px;

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
        box-shadow: none;
        border-radius: 0;

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
  