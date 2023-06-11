<template>
  <v-container>
    <h1>Contáctanos</h1>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-form ref="formulario">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="nombre" label="Nombre" @change="checkFormulario" :rules="firstNameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="cuidad" label="Ciudad" @change="checkFormulario" :rules="ciudadRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="apellidos" label="Apellidos" @change="checkFormulario" :rules="lastNameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="codigoPostal" label="Código Postal" @change="checkFormulario" :rules="postalCodeRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="correoElectronico" label="Correo Electrónico" @change="checkFormulario" :rules="emailRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="mensaje" label="Mensaje" @change="checkFormulario"></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center" class="buttons">
          <v-btn color="primary" @click="enviarFormulario" :disabled="btnDisabled">Aceptar</v-btn>
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
    btnDisabled: true,
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
    ],
    ciudadRules: [
      (value) => {
        if (/^[a-zA-Z]+$/.test(value)) return true;
        return "La ciudad solo puede contener letras.";
      },
    ],
  }),
  methods: {
    checkFormulario(){
      if(this.nombre && this.apellidos && this.ciudad && this.codigoPostal && this.correoElectronico && this.mensaje){
        this.btnDisabled = false;
      }else{
        this.btnDisabled = true;
      }
    },
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

  margin-top: 100px;
  flex-wrap: wrap;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.buttons>* {
  margin-right: 10px;
}

h1 {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

@media only screen and (max-width: 600px) {
  .v-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
  