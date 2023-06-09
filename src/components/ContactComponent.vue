<template>
  <v-container>
    <v-row justify="center">
      <h1>Carrito</h1>
      <v-col cols="12" md="8" lg="6">
        <v-form ref="formulario">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="nombre" label="Nombre" :rules="firstNameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="apellidos" label="Ciudad"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="ciudad" label="Apellidos" :rules="lastNameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="codigoPostal" label="Código Postal" :rules="postalCodeRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="correoElectronico" label="Correo Electrónico" :rules="emailRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="mensaje" label="Mensaje"></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center" class="buttons">
          <v-btn color="primary" @click="enviarFormulario">Aceptar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="limpiarCampos">Vaciar Campos</v-btn>
        </v-row>
        <v-snackbar v-model="mostrarMensaje" :timeout="2000" color="success">
          Formulario enviado correctamente
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
export default {

  data: () => ({
    nombre: '',
    apellidos: '',
    ciudad: '',
    codigoPostal: '',
    correoElectronico: '',
    mensaje: '',
    mostrarMensaje: false,
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
    postalCodeRules: [
      (value) => {
        if (/^\d{5}$/.test(value)) return true;
        return "El código postal debe contener exactamente 5 dígitos numéricos.";
      },
    ]
  }),
  methods: {
    enviarFormulario() {
      if (this.$refs.formulario.validate()) {
        setTimeout(() => {
          this.mostrarMensaje = true;
          this.limpiarCampos();
        }, 200);
      }
    },
    limpiarCampos() {
      this.nombre = '';
      this.apellidos = '';
      this.ciudad = '';
      this.codigoPostal = '';
      this.correoElectronico = '';
      this.mensaje = '';
      this.$refs.formulario.resetValidation();
    }
  }
};
</script>
  
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.buttons>* {
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .v-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
  