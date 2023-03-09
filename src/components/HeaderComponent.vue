<template>
  <v-container class="header-container">
    <v-app-bar app color="primary" dark>
      <div class="text-h4 title">Nyxellnt</div>

      <div class="avatar-container">
          <v-avatar color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>
      </div>

      <div class="btn-container" v-if="false">
        <v-btn href target="_blank" text>
          <span class="mr-2">Iniciar sesión</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
        <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
          <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text> -->
          <span class="mr-2">Registrarse</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "HeaderComponent",

  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
};
</script>


<style scoped>
.header-container {
  height: 64px;
}
.btn-container {
  border: 1px solid black;
  position: fixed;
  right: 10px;
  height: 36px;
}
.avatar-container {
  border: 1px solid black;
  position: fixed;
  right: 10px;
  height: 36px;
  width: 200px;
}
.v-avatar{
}
header {
  display: flex;
  justify-content: center;
}
.v-btn {
  border: 1px solid black;
  margin: 0 10px;
}
</style>