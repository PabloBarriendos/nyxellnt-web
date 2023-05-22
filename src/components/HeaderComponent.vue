<template>
  <v-container class="header-container">
    <v-app-bar app color="primary" dark>
      <v-row justify="center">
        <v-dialog
          v-model="this.$store.state.showLoginPopUp"
          persistent
          width="1024"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Iniciar sesión</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="emailLogin"
                      label="Email*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="passwordLogin"
                      label="Contraseña*"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                v-on:click="cerrarLoginPopUp"
                >Cerrar</v-btn
              >
              <v-btn color="blue-darken-1" variant="text" @click="login"
                >Iniciar sesión</v-btn
              >
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
                    <v-text-field
                      id="nombre"
                      label="Nombre*"
                      @change="checkRegister"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      id="apellido"
                      label="Apellido*"
                      @change="checkRegister"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="email"
                      label="Email*"
                      @change="checkRegister"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="password"
                      label="Contraseña*"
                      @change="checkRegister"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="password2"
                      label="Repetir contraseña*"
                      @change="checkRegister"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="() => (showRegisterPopUp = false)"
                >Cerrar</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="register"
                :disabled="registerDisabled"
                >Registrarse</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showPersonalInfoPopUp" persistent width="1024">
          <v-card>
            <v-card-title>
              <span class="text-h5">Información personal</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-card-text label="Nombre">
                      <strong>Nombre: {{ $store.state.user.nombre }}</strong>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-card-text label="Apellidos">
                      <strong
                        >Apellido: {{ $store.state.user.apellido }}</strong
                      >
                    </v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text label="Email">
                      <strong>Email: {{ $store.state.user.email }}</strong>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text label="Contraseña" type="password">
                      <strong>Contraseña:</strong>
                      ***********
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="() => (showPersonalInfoPopUp = false)"
                >Cerrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="text-h4 title">
        <router-link to="/">Nyxellnt</router-link>
      </div>

      <div class="btn-container" v-if="!$store.state.userLogged">
        <v-btn href target="_blank" v-on:click="loginPopUp" text>
          <span class="mr-2"
            >Iniciar sesión{{ $store.state.user.userLogged }}</span
          >
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
        <p v-on:click="showInfo">Información personal</p>
        <p v-on:click="misCompras">Mis compras</p>
        <p v-on:click="logout">Cerrar sesión</p>
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
    usuario: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rol: "",
    },
    showRegisterPopUp: false,
    showUserDropdown: false,
    showPersonalInfoPopUp: false,
  }),
  created() {
    this.$store.dispatch("cargarCookiesUsuario");
  },
  methods: {
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
    showInfo() {
      this.showPersonalInfoPopUp = true;
      this.showUserDropdown = false;
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
    misCompras() {
      this.showUserDropdown = false;
      this.$router.push(`/mis-eventos?id=${this.usuario.idUsuario}`);
    },
    userDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
  },
};
</script>


<style lang="scss" scoped>
.header-container {
  height: 84px;

  .v-app-bar {
    height: 84px !important;
    display: flex;
    align-items: center;

    .btn-container {
      position: fixed;
      right: 10px;
      height: 36px;
    }

    .avatar-container {
      position: fixed;
      right: 10px;
      height: 48px;
      width: 200px;
      display: flex;
      align-items: center;

      p {
        margin-bottom: 0;
        margin-left: 20px;
      }
    }

    .user-dropdown {
      width: 240px;
      height: 154px;
      background-color: #1976d2;
      position: fixed;
      right: 0;
      top: 84px;

      p {
        margin: 20px 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
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
}

.v-application a {
  color: white;
  text-decoration: none;
}
</style>