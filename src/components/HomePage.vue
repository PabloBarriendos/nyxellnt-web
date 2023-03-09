<template>
    <v-card class="tarjeta" variant="tonal">
        <div class="izquierda">
            <img src="../photo/descarga.jpeg">
        </div>
        <div class="derecha">
            <v-card-title>
                carta
            </v-card-title>
            <v-card-subtitle>
                Subtitulo
            </v-card-subtitle>
            <v-card-text>
                sdfaslfuahflasduhfalkjhaslkgjahslkj
            </v-card-text>
            <v-card-actions>
                <v-btn>Click me</v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'HomePage',
    data: () => ({
    }),
}
</script>

<style>
.tarjeta {
    display: flex;
    width: 1000px;
    height: 300px;
}

.derecha{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - 200px);
}

.izquierda{
    width: 200px;
}
</style>