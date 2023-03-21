<template>
    <v-card class="tarjeta" variant="tonal">
        <div class="izquierda">
            <img src="../photo/R.jpeg">
        </div>
        <div class="derecha">
            <v-card-title>
                {{ titulo }}
            </v-card-title>
            <v-card-subtitle>
                {{ cantante }} - {{ localidad }} - {{ genero }}
            </v-card-subtitle>
            <v-card-text>
                {{ descripcion }}
            </v-card-text>
            <v-card-text> Fecha del evento: {{ fecha }} </v-card-text>
            <v-card-text> Precio entrada: {{ precioEntrada }} € </v-card-text>
            <v-card-text>
                Entradas compradas: {{ numEntradas }}
            </v-card-text>
            <v-card-text>
                Precio total: {{ precioTotal }} €
            </v-card-text>
            <v-card-text> Fecha de compra: {{ fechaCompra }} </v-card-text>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        id: Number,
        titulo: String,
        cantante: String,
        descripcion: String,
        localidad: String,
        genero: String,
        numEntradas: Number,
        precioEntrada: Number,
        precioTotal: Number,
        fecha: String,
        fechaCompra: String,
    }
};
</script>

<style scoped>
.tarjeta {
    display: flex;
    padding: 20px;
}

.derecha {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - 200px);
    margin-left: 70px;
}

.izquierda {
    width: 200px;
    margin-left: 50px;
    margin-top: 30px;
}

img {
    height: 250px;
    width: 200px;
}
</style>