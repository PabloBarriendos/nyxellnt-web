<template>
    <v-container class="compraFinalizada-container">

        <v-card class="card-container" v-if="!$store.state.errorCompra">
            <div class="card-imagen">
                <img src="../assets/compraSuccess.png" alt="">
            </div>
            <div class="card-texto">
                <v-card-title>
                    ¡Enhorabuena! Tu compra se ha realizado correctamente.
                </v-card-title>
                <v-card-actions>
                    <v-btn color="black" @click="goToHome" class="white--text">Página principal</v-btn>
                </v-card-actions>
            </div>
        </v-card>
        <v-card class="card-container" v-if="$store.state.errorCompra">
            <div class="card-imagen">
                <img src="../assets/compraSuccess.png" alt="">
            </div>
            <div class="card-texto">
                <v-card-title>
                    ¡Lo sentimos! Ha habido un problema con la compra.
                </v-card-title>
                <v-card-text>
                    Parece que ha surgido un problema, vuelve a intentarlo más tarde.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="black" @click="goToHome" class="white--text">Página principal</v-btn>
                </v-card-actions>
            </div>
        </v-card>

    </v-container>
</template>
  
<script>
export default {
    name: "CompraFinalizadaComponent",
    data: () => ({
        compraValida: false,
    }),
    created() {
        console.log('EYYY',this.$store.state.errorCompra);
    },
    destroyed(){

    },
    methods: {
        goToHome() {
            this.$router.push(`/`);
        },
    },
};
</script>
  
<style lang="scss" scoped>
.compraFinalizada-container {
    max-width: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    height: 100%;
    margin-top: 84px;

    // /* Establecer la imagen de fondo */
    // background-image: url('ruta/a/la/imagen.jpg');
    
    // /* Ajustar el tamaño de la imagen de fondo */
    // background-size: cover;
    
    // /* Fijar la posición de la imagen de fondo */
    // background-attachment: fixed;
    
    // /* Establecer el fondo como fijo para el cuerpo de la página también */
    // /* Esto asegurará que la imagen de fondo se mantenga fija incluso si se desplaza la página */
    // background: fixed;

    .card-container{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .card-imagen{
            width: 100%;
            display: flex;
            justify-content: center;
            img{
                width: 130px;
            }
        }
        .card-texto{
            width: 100%;

            .v-card__title, .v-card__text{
                margin: 20px 0;
                display: flex;
                justify-content: center;
                word-break: break-word;
                text-align: center;
            }
            .v-card__text{
                font-size: 16px;
            }
            .v-card__actions{
                display: flex;
                justify-content: center;
            }
        }
    }

}
</style>
