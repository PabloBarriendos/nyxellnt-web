<template>
    <v-card class="tarjeta" variant="tonal">
        <div class="izquierda">
            <img src="../photo/R.jpeg">
        </div>
        <div class="derecha">
            <v-card-title>
                40 Aniversario Rock&Rios
            </v-card-title>
            <v-card-subtitle>
                Miguel Ríos - Wizink Center de Madrid - Rock
            </v-card-subtitle>
            <v-card-text>
                Cuarenta años, en apariencia, no son nada, pero cuando se celebran ha de hacerse a lo grande, y esta ocasión lo merece, pues han pasado cuatro décadas de las dos veladas del Rock & Ríos en el Pabellón de la Ciudad Deportiva del Real Madrid los días 5 y 6 de marzo de 1982.
            </v-card-text>
            <v-card-text>
                Fecha del evento: 2023-03-11
            </v-card-text>
            <v-card-text>
                Fecha de compra: 
            </v-card-text>
            <v-card-text>
                Entradas compradas: 
            </v-card-text>
            <v-card-text>
                Precio total: 
            </v-card-text>
        </div>
    </v-card>
</template>

<style scoped>
.tarjeta {
    display: flex;
    padding: 20px;
}

.derecha{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - 200px);
    margin-left: 70px;
}

.izquierda{
    width: 200px;
    margin-left: 50px;
    margin-top: 30px;
}

img{
    height: 250px;
    width: 200px;
}
</style>