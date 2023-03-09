<template>
    <v-footer class="d-flex flex-column">
        <div class="bg-teal d-flex w-100 align-center px-4">
            <strong>¡Siguenos en nuestras redes sociales!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4 icono" :icon="icon" variant="plain" size="small" color="black"></v-btn>
        </div>

        <div class="px-4 py-2 bg-black text-center w-100">
            {{ new Date().getFullYear() }} — <strong>Nyxelln`t</strong>
        </div>
    </v-footer>
</template>
  
<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-instagram',
        ],
    }),
}
</script>
<style scoped>
    .icono{
        background-color:grey;
    }
</style>