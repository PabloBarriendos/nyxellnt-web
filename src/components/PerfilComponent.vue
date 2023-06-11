<template>
    <div class="profile-edit">
        <div class="profile-form">
            <h2 class="mb-3">Editar Perfil</h2>
            <div class="profile-picture">
                <!-- Aquí va la foto de perfil -->
            </div>
            <v-form>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="name" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="lastname" label="Correo Electronico"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="email" label="Apellidos" type="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="botones">
                        <v-btn class="mr-2" color="success" @click="saveProfile">Guardar</v-btn>
                        <v-btn color="error" @click="cancel">Cancelar</v-btn>
                    </v-col>
                </v-row>
                <span class="delete-profile" @click="deleteProfile">Eliminar perfil</span>
                <span v-if="showDeleteText" class="delete-text">Perfil eliminado</span>
            </v-form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            name: '',
            lastname: '',
            email: '',
            password: '',
            showDeleteText: false
        };
    },
    methods: {
        saveProfile() {
            // Lógica para guardar el perfil
        },
        cancel() {
            // Lógica para cancelar la edición del perfil
            this.showDeleteText = true;
        }
    }
};
</script>
  
<style>
.profile-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.profile-picture {
    /* Estilos de la foto de perfil */
}

.profile-form {
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
}

.profile-form h2 {
    margin-bottom: 10px;
}

.mb-3 {
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

.botones{
    padding: 50px;
}
</style>
  