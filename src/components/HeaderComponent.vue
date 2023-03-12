<template>
  <v-container class="header-container">
    <v-app-bar app color="primary" dark>
      <v-row justify="center">
        <v-dialog v-model="showLoginPopUp" persistent width="1024">
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
                @click="() => (showLoginPopUp = false)"
              >
                Cerrar
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="login">
                Iniciar sesión
              </v-btn>
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
              >
                Cerrar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="register"
                :disabled="registerDisabled"
              >
                Registrarse
              </v-btn>
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
                    <v-card-text label="Nombre"
                      ><strong>Nombre: {{ this.usuario.nombre }}</strong>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-card-text label="Apellidos"
                      ><strong>Apellido: {{ this.usuario.apellido }}</strong>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text label="Email"
                      ><strong>Email: {{ this.usuario.email }}</strong>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12">
                    <v-card-text label="Contraseña" type="password"
                      ><strong>Contraseña: </strong> ***********</v-card-text
                    >
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
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="text-h4 title">
        <router-link to="/">Nyxellnt</router-link>
      </div>

      <div class="btn-container" v-if="!showUser">
        <v-btn href target="_blank" v-on:click="loginPopUp" text>
          <span class="mr-2">Iniciar sesión</span>
        </v-btn>
        <v-btn href="" target="_blank" v-on:click="registerPopUp" text>
          <span class="mr-2">Registrarse</span>
        </v-btn>
      </div>

      <div class="avatar-container" v-if="showUser">
        <v-avatar color="info">
          <v-icon size="x-large">mdi-account</v-icon>
        </v-avatar>
        <p>{{ this.usuario.nombre }}</p>
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
    },
    showLoginPopUp: false,
    showRegisterPopUp: false,
    showUserDropdown: false,
    showUser: false,
    showPersonalInfoPopUp: false,
  }),
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
      this.showLoginPopUp = !this.showLoginPopUp;
    },
    showInfo() {
      this.showPersonalInfoPopUp = true;
      this.showUserDropdown = false;
    },
    async login() {
      await fetch("https://nyxellnt-api-2.azurewebsites.net/usuario")
        .then((response) => response.json())
        .then((data) => (this.resultados = data))
        .catch((error) => console.error(error));

      this.resultados.forEach((element) => {
        if (
          element.email == document.getElementById("emailLogin")?.value &&
          element.password == document.getElementById("passwordLogin")?.value
        ) {
          this.usuario = element;
          document.cookie = `idUsuario=${element.idUsuario}`;
          this.showUser = true;
        }
      });
      this.showLoginPopUp = false;
    },
    registerPopUp() {
      this.showRegisterPopUp = !this.showRegisterPopUp;
    },
    async register() {
      // TODO
      // hacer comprobaciones de que los datos sean correctos
      // añadir el usuario a la base de datos

      await fetch(
        "https://nyxellnt-api-2.azurewebsites.net/usuario",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            nombre: document.getElementById("nombre")?.value,
            apellido: document.getElementById("apellido")?.value,
            email: document.getElementById("email")?.value,
            password: document.getElementById("password")?.value,
          }),
        }
      );

      await fetch("https://nyxellnt-api-2.azurewebsites.net/usuario")
        .then((response) => response.json())
        .then((data) =>
          data.forEach((usuario) => {
            if (usuario.email == document.getElementById("email")?.value) {
              this.usuario = usuario;
              document.cookie = `idUsuario=${usuario.idUsuario}`;
            }
          })
        )
        .catch((error) => console.error(error));

      this.showRegisterPopUp = false;
      this.showUser = true;
    },
    logout() {
      this.showUserDropdown = false;
      this.showUser = false;
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


<style scoped>
.header-container {
  height: 84px;
}

.v-app-bar {
  height: 84px !important;
  display: flex;
  align-items: center;
}

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
}

.avatar-container p {
  margin-bottom: 0;
  margin-left: 20px;
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

.user-dropdown {
  width: 240px;
  height: 154px;
  background-color: #1976d2;
  position: fixed;
  right: 0;
  top: 84px;
}

.user-dropdown p {
  margin: 20px 20px;
}

.user-dropdown p:hover {
  cursor: pointer;
}

.v-application a {
  color: white;
  text-decoration: none;
}
</style>