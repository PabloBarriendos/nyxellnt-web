<template>
  <v-container :class="{ showFondo: showFondo || !this.$store.state.paginaHome }" class="header-container">
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
                    <v-text-field id="emailLogin" label="Email*" @change="checkLogin" required
                      :rules="emailRules"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="passwordLogin" label="Contraseña*" type="password" @change="checkLogin"
                      required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" variant="text" v-on:click="cerrarLoginPopUp">Cerrar</v-btn>
              <v-btn color="success" variant="text" :disabled="loginDisabled" @click="login">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showRegisterPopUp" persistent width="1024" content-class="registerClass">
          <v-card class="customClass">
            <v-card-title>
              <span class="text-h5">Registrarse</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field id="nombre" label="Nombre*" @change="checkRegister" required
                      :rules="firstNameRules"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field id="apellido" label="Apellido*" @change="checkRegister" required
                      :rules="lastNameRules"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field id="email" label="Email*" @change="checkRegister" required
                      :rules="emailRules"></v-text-field>
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
              <v-btn color="error" variant="text" @click="() => (showRegisterPopUp = false)">Cerrar</v-btn>
              <v-btn color="success" variant="text" @click="register" :disabled="registerDisabled">Registrarse</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="text-h4 title">
        <router-link class="router-link" to="/" ><img @click="goToHome" src="../assets/logo.png" />
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
        <v-avatar>
          <img class="usuarioImg" v-if="$store.state.user.imagen" :src="$store.state.user.imagen" />
          <img src="../assets/usuario.png" alt="Profile" />
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
    loginDisabled: true,
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
    showUserDropdown: false,
    emailRules: [
      (value) => {
        if (/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) return true;
        return "Debe ser un Email valido.";
      }
    ],
    firstNameRules: [
      (value) => {
        if (value?.length > 2 && /^[a-zA-Z]+$/.test(value)) return true;

        return "El nombre debe contener al menos 3 carácteres y no contener números ni simbolos.";
      },
    ],
    lastNameRules: [
      (value) => {
        if (/^[a-zA-Z]+$/.test(value)) return true;
        return "El apellido solo puede contener letras.";
      },
    ],
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
      if (this.$store.state.paginaHome) {
        if (window.scrollY > 515) {
          this.showFondo = true;
        } else {
          // Si la posición del desplazamiento es 0, mostrar el encabezado
          this.showFondo = false;
        }
      }
    },
    checkLogin() {
      if (document.getElementById("emailLogin")?.value &&
        document.getElementById("passwordLogin")?.value) {
        this.loginDisabled = false;
      } else {
        this.loginDisabled = true;
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
    goToHome() {
      this.$router.push(`/`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    logout() {
      this.$store.dispatch("logout");
      this.showUserDropdown = false;
      this.$router.push(`/`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    miPerfil() {
      this.$router.push(`/perfil`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    carrito() {
      this.showUserDropdown = false;

      let listaEntradasStorage = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
      if (!listaEntradasStorage) {
        listaEntradasStorage = [];
        localStorage.setItem('listaEntradasCarrito', JSON.stringify(listaEntradasStorage));
      }

      this.$router.push(`/carrito`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    misCompras() {
      this.showUserDropdown = false;
      this.$router.push(`/mis-festivales`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    userDropdown(event) {
      event.stopPropagation();
      this.showUserDropdown = !this.showUserDropdown;
    },
    closeUserDropdown() {
      this.showUserDropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.registerClass {
  margin-top: 100px;
}

.header-container {
  height: 84px;
  position: absolute;
  width: 100%;
  max-width: 100%;
  top: 0;
  width: 100%;
  z-index: 9999;

  .v-avatar {
    img {
      width: 48px;
      height: 48px;

      &.usuarioImg {
        position: absolute;
        border-radius: 50%
      }
    }
  }


  &.showFondo {
    position: fixed;

    .v-app-bar {
      position: fixed;
      background-color: white !important;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;

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

          .v-icon {
            color: black;
          }
        }
      }
    }

    p,
    span {
      color: black;
    }

    .menu-icon {
      color: black;
    }
  }

  .v-app-bar {
    height: 84px !important;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: none !important;
    position: relative;

    .title {
      .router-link {
        display: flex;
        align-items: center;

        p {
          font-family: "Times New Roman", Times, serif;
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
        span {
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
      z-index: 5;

      p {
        font-size: 18px;
        margin-bottom: 0;
        margin-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .user-dropdown {
      width: 240px;
      height: 340px;
      padding-top: 84px;
      background-color: black;
      position: fixed;
      right: 0;
      top: 0;
      box-shadow: -2px 2px 4px -1px rgba(250, 250, 250, 0.5);

      div {
        display: flex;
        justify-content: flex-start;
        padding-left: 36px;

        .v-icon {
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

@media only screen and (max-width: 680px) {
  .header-container {
    height: 120px;

    .v-app-bar {
      box-shadow: none;

      .btn-container {
        height: auto;
        width: calc(100% - 250px);
        display: flex;
        flex-wrap: wrap;

        .v-btn {
          width: 100%;
        }
      }
    }
  }
}

@media only screen and (max-width: 480px) {
  .header-container {
    .v-app-bar {
      .btn-container {
        height: auto;
        width: calc(100% - 100px);
        justify-content: end;

        .v-btn {
          width: auto;
        }
      }

      .avatar-container {
        justify-content: center;

        .v-avatar {
          display: none;
        }
      }
    }
  }

  .title {
    img {
      width: 66px;
    }

    p {
      display: none;
    }
  }
}
</style>
