<template>
  <v-container :class="{ showFondo: showFondo }" class="header-container">
    <v-app-bar app color="transparent" dark>
      <v-row>
        <v-dialog v-model="this.$store.state.showLoginPopUp" persistent width="1024">
          <v-card>
            <v-card-title>
              <span class="text-h5">Iniciar sesión</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field id="emailLogin" label="Email*" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="passwordLogin" label="Contraseña*" type="password" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" v-on:click="cerrarLoginPopUp">Cerrar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="login">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showRegisterPopUp" persistent width="1024">
          <v-card>
            <v-card-title>
              <span class="text-h5">Registrarse</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field id="nombre" label="Nombre*" @change="checkRegister" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field id="apellido" label="Apellido*" @change="checkRegister" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="email" label="Email*" @change="checkRegister" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="password" label="Contraseña*" @change="checkRegister" type="password"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="password2" label="Repetir contraseña*" @change="checkRegister" type="password"
                      required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="() => (showRegisterPopUp = false)">Cerrar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="register"
                :disabled="registerDisabled">Registrarse</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="text-h4 title">
        <router-link class="router-link" to="/"><img src="../assets/Logo.png">
          <p>Festivalia</p>
        </router-link>
      </div>

      <div class="btn-container" v-if="!$store.state.userLogged">
        <v-btn href target="_blank" v-on:click="loginPopUp" text>
          <span class="mr-2">Iniciar sesión{{ $store.state.user.userLogged }}</span>
        </v-btn>
        <v-btn href target="_blank" v-on:click="registerPopUp" text>
          <span class="mr-2">Registrarse</span>
        </v-btn>
      </div>

      <div class="avatar-container" v-if="$store.state.userLogged">
        <v-avatar color="info">
          <v-icon size="x-large">mdi-account</v-icon>
        </v-avatar>
        <p>{{ this.$store.state.user.nombre }}</p>
        <v-icon class="menu-icon" v-on:click="userDropdown">mdi-menu</v-icon>
      </div>

      <div class="user-dropdown" v-if="showUserDropdown">
        <div v-on:click="miPerfil">
          <v-icon>mdi-account-circle</v-icon>
          <p>Mi Perfil</p>
        </div>
        <div v-on:click="misCompras">
          <v-icon>mdi-calculator</v-icon>
          <p>Mis Compras</p>
        </div>
        <div v-on:click="carrito">
          <v-icon>mdi-cart</v-icon>
          <p>Carrito</p>
        </div>
        <div v-on:click="logout">
          <v-icon color="red">mdi-logout</v-icon>
          <p>Cerrar sesión</p>
        </div>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "HeaderComponent",
  components: {},
  data: () => ({
    registerDisabled: true,
    showFondo: false,
    usuario: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rol: "",
    },
    showRegisterPopUp: false,
    showUserDropdown: false
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("cargarCookiesUsuario");
    document.addEventListener("click", this.closeUserDropdown);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.closeUserDropdown);
  },
  methods: {
    handleScroll() {
      // Si la posición del desplazamiento es mayor a 0, ocultar el encabezado
      this.showUserDropdown = false;
      if (window.scrollY > 515) {
        this.showFondo = true;
      } else {
        // Si la posición del desplazamiento es 0, mostrar el encabezado
        this.showFondo = false;
      }
    },
    checkRegister() {
      if (
        document.getElementById("nombre")?.value &&
        document.getElementById("apellido")?.value &&
        document.getElementById("email")?.value &&
        document.getElementById("password")?.value &&
        document.getElementById("password")?.value ==
        document.getElementById("password2")?.value
      ) {
        this.registerDisabled = false;
      } else {
        this.registerDisabled = true;
      }
    },
    loginPopUp() {
      this.$store.dispatch("setLoginPopUp", true);
    },
    cerrarLoginPopUp() {
      this.$store.dispatch("setLoginPopUp", false);
    },
    async login() {
      let email = document.getElementById("emailLogin")?.value;
      let password = document.getElementById("passwordLogin")?.value;

      this.$store.dispatch("login", { email: email, password: password });
      this.cerrarLoginPopUp();
    },
    registerPopUp() {
      this.showRegisterPopUp = !this.showRegisterPopUp;
    },
    async register() {
      this.$store.dispatch("register", {
        nombre: document.getElementById("nombre")?.value,
        apellido: document.getElementById("apellido")?.value,
        email: document.getElementById("email")?.value,
        password: document.getElementById("password")?.value,
        rol: "user",
      });
      this.showRegisterPopUp = false;
    },
    logout() {
      this.$store.dispatch("logout");
      this.showUserDropdown = false;
      this.$router.push(`/`);
    },
    miPerfil() {

    },
    carrito() {
      this.showUserDropdown = false;
      this.$router.push(`/carrito`);
    },
    misCompras() {
      this.showUserDropdown = false;
      this.$router.push(`/mis-festivales?id=${this.usuario.idUsuario}`);
    },
    userDropdown(event) {
      event.stopPropagation();
      this.showUserDropdown = !this.showUserDropdown;
    },
    closeUserDropdown() {
      this.showUserDropdown = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 84px;
  position: fixed;

  &.showFondo{
    .v-app-bar{
      background-color: white !important;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
      .user-dropdown {
        box-shadow: -2px 3px 4px -1px rgba(0, 0, 0, 0.5);
        background-color: white;
        height: 256px;
        padding-top: 0;
        top: 84px;
  
        div {
          &:hover {
            background-color: rgba(200, 200, 200, 0.5);
            p {
              font-weight: bold;
            }
          }
          .v-icon{
            color: black;
          }
        }
      }
    }
    p, span{
      color: black;
    }
    .menu-icon{
      color: black;
    }
  }

  .v-app-bar {
    height: 84px !important;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: none !important;

    .title {
      .router-link {
        display: flex;
        align-items: center;

        p {
          font-family: 'Times New Roman', Times, serif;
          margin-bottom: 0;
        }

      }
    }

    .row {
      position: fixed;
    }

    .btn-container {
      position: fixed;
      right: 10px;
      height: 36px;
      button {
        span{
          font-size: 18px;
        }
      }
      
    }

    .avatar-container {
      position: fixed;
      right: 10px;
      height: 48px;
      width: 200px;
      display: flex;
      align-items: center;

      p {
        font-size: 18px;
        margin-bottom: 0;
        margin-left: 20px;
      }
    }

    .user-dropdown {
      width: 240px;
      height: 340px;
      padding-top: 84px;
      background-color: transparent;
      position: fixed;
      right: 0;
      top: 0;
      box-shadow: -2px 2px 4px -1px rgba(250, 250, 250, 0.5);

      div {
        display: flex;
        justify-content: flex-start;
        padding-left: 36px;

        .v-icon{
          color: white;
        }

        &:hover {
          cursor: pointer;
          background-color: rgba(250, 250, 250, 0.5);

          p {
            font-weight: bold;
          }
        }

        &:last-of-type p {
          color: red;
        }

        p {
          margin: 20px 20px;
        }
      }
    }
  }
}

img {
  width: 80px;
}

header {
  display: flex;
  justify-content: center;
}

.text-h4 title {
  .router-link {
    display: flex;
    align-items: center;

    p {
      margin-bottom: 0;
    }

  }
}

.v-btn {
  margin: 0 10px;
}

.menu-icon {
  margin-left: 16px;
  width: 20px;
}

.v-application a {
  color: white;
  text-decoration: none;
}

@media only screen and (max-width: 550px) {
  .header-container {
    height: 120px;

    .v-app-bar {
      height: 120px !important;
      box-shadow: none;

      .btn-container {
        height: auto;
        width: calc(100% - 150px);
        display: flex;
        flex-wrap: wrap;

        .v-btn {
          width: 100%;
        }
      }

      .user-dropdown {
        top: 120px;
      }
    }
  }
}
</style>
