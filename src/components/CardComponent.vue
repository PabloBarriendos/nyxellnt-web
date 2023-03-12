<template>
  <v-card class="tarjeta" variant="tonal">
    <div class="izquierda">
      <img src="../photo/R.jpeg" />
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
      <v-card-text> Precio: {{ precio }} € </v-card-text>
      <v-card-actions>
        <v-btn class="mx-4 white--text" v-on:click="setId" elevation="2" x-large rounded color="blue">
          Comprar
        </v-btn>
      </v-card-actions>
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
    precio: Number,
    fecha: String,
  },
  methods: {
    setId() {
      this.$router.push(`/evento?id=${this.id}`)
    },
  },
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
  height: 250px;
  width: 200px;
}

img {
  height: 100%;
  width: 100%;
}
</style>