<template>
    <div class="profile-edit">
        <div class="profile-form">
            <h2 class="mb-3">Editar Perfil</h2>
            <div class="profile-picture">
                <img class="usuarioImg" v-if="usuario.imagen" :src="usuario.imagen"/>
                <img src="../assets/usuario.png" alt="Profile"/>
                <v-text-field v-model="usuario.imagen" label="Url de imagen" @change="checkPerfil"></v-text-field>
            </div>
            <v-form>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.nombre" label="Nombre" @change="checkPerfil"
                            :rules="firstNameRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.apellido" label="Apellidos" type="email" @change="checkPerfil"
                            :rules="lastNameRules"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.email" label="Correo Electronico" @change="checkPerfil"
                            :rules="emailRules"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.password" label="Contraseña" type="password"
                            @change="checkPerfil"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="botones">
                        <v-btn color="success" @click="saveProfile" :disabled="guardarDisabled">Guardar</v-btn>
                        <v-btn color="error" @click="cancel">Cancelar</v-btn>
                    </v-col>
                </v-row>
                <span class="delete-profile" @click="deletePopUp">Eliminar perfil</span>
            </v-form>
        </div>
        <v-dialog v-model="showDeletePopUp" persistent width="400">
            <v-card class="popupDelete">
                <v-card-text>
                    <span class="text-h5">¿Estas seguro de que deseas eliminar tu cuenta?</span>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" variant="text" v-on:click="deleteCuenta()">Aceptar</v-btn>
                    <v-btn color="error" variant="text" @click="cerrarDeletePopUp">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        guardarDisabled: false,
        showDeletePopUp: false,

        usuario: {
            nombre: "",
            apellido: "",
            email: "",
            idUsuario: "",
            imagen: "",
            password: "",
            rol: "",
        },
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
    async created() {
        await this.$store.dispatch("cargarCookiesUsuario");
        console.log('asdasd', this.$store.state.user);
        if (this.$store.state.user) {
            this.usuario = { ...this.$store.state.user };
        }
    },
    methods: {
        deletePopUp() {
            this.showDeletePopUp = true;
        },
        cerrarDeletePopUp() {
            this.showDeletePopUp = false;
        },
        async deleteCuenta(){
            await this.$store.dispatch("deleteCuenta", this.$store.state.user.idUsuario);
            await this.$store.dispatch("logout");
            this.$router.push("/");
        },
        checkPerfil() {
            if (this.usuario.nombre && this.usuario.apellido && this.usuario.email && this.usuario.password) {
                this.guardarDisabled = false;
            } else {
                this.guardarDisabled = true;
            }
        },
        async saveProfile() {
            if (!this.guardarDisabled) {
                await this.$store.dispatch('editarPerfil', this.usuario);
                await this.$store.dispatch('login', this.usuario);
                await this.$store.dispatch("cargarCookiesUsuario");
            }
        },
        cancel() {
            this.usuario = { ...this.$store.state.user };
        }
    }
};
</script>
  
<style lang="scss">
.popupDelete {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 70px;
    margin-bottom: 60px;

    .profile-form {
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
        padding: 20px;

        .profile-picture {
            img{
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-bottom: 10px;
                &.usuarioImg{
                    position: absolute;
                }
            }
            .v-input{
                margin: 20px 0;
            }
        }

        h2 {
            margin-bottom: 10px;
            padding: 50px;
            font-size: xx-large;
        }

        .delete-text {
            color: red;
        }

        .delete-profile {
            color: red;
            cursor: pointer;
            text-decoration: underline;
        }

        .botones {
            padding: 50px;
            .v-btn{
                margin: 10px;
            }
        }
    }
}
</style>
  