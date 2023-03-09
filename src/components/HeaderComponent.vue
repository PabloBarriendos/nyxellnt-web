<template>
  <v-container class="header-container">
    <v-app-bar app color="primary" dark>
      <div class="text-h4 title">Nyxellnt</div>

      <div class="btn-container" v-if="!showUser">
        <v-btn href target="_blank" v-on:click="login" text>
          <span class="mr-2">Iniciar sesión</span>
        </v-btn>
        <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
          <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text> -->
          <span class="mr-2">Registrarse</span>
          <!-- <v-icon>mdi-open-in-new</v-icon> -->
        </v-btn>
      </div>

      <div class="avatar-container" v-if="showUser">
          <v-avatar color="info">
            <!-- <v-icon icon="mdi-account-circle"></v-icon> -->
          <v-icon size="x-large" >mdi-account</v-icon>
          </v-avatar>
            <p>Usuario X</p>
            <v-icon class="menu-icon" v-on:click="userDropdown"  >mdi-menu</v-icon>
      </div>

      <div class="user-dropdown" v-if="showUserDropdown">
        <p>Información personal</p>
        <p>Mis compras</p>
        <p>Cerrar sesión</p>
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
    showUserDropdown: false,
    showUser: false
  }),
  methods:{
    login(){
      this.showUser = !this.showUser;
    },
    userDropdown(){
      this.showUserDropdown = !this.showUserDropdown
    }
  }
};
</script>


<style scoped>
.header-container {
  height: 84px;
}
.v-app-bar{
  height: 84px !important;
  display: flex;
  align-items: center;
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
  height: 48px;
  width: 200px;
  display: flex;
  align-items: center;
}
.avatar-container p{
  margin-bottom: 0;
  margin-left: 20px;
}
header {
  display: flex;
  justify-content: center;
}
.v-btn {
  border: 1px solid black;
  margin: 0 10px;
}
.menu-icon{
  margin-left: 16px;
}
.user-dropdown{
  width: 240px;
  height: 204px;
  background-color: #1976d2;
  position: fixed;
  right: 0;
  top: 84px;
}
.user-dropdown p{
  margin: 20px 20px;
}
</style>