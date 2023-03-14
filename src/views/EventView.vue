<template>
  <v-container class="container">
    <div class="superior">
      <img src="../photo/R.jpeg" />
      <div>
        <v-card-title>
          {{ this.$store.state.eventoCompra.nombre }}
        </v-card-title>
        <v-card-subtitle>
          {{ this.$store.state.eventoCompra.cantante }} - {{ this.$store.state.eventoCompra.localidad }} -
          {{ this.$store.state.eventoCompra.categoria }}
        </v-card-subtitle>
        <v-card-text>
          {{ this.$store.state.eventoCompra.descripcion }}
        </v-card-text>
        <v-card-text> Fecha evento: {{ this.$store.state.eventoCompra.fecha }} </v-card-text>
        <v-card-text>
          Precio entrada: {{ this.$store.state.eventoCompra.precioEntrada }} €
        </v-card-text>
      </div>
    </div>

    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field id="firstName" @change="checkCompra" v-model="firstName" label="Nombre"
          :rules="firstNameRules"></v-text-field>

        <v-text-field id="lastName" @change="checkCompra" v-model="lastName" label="Apellidos"
          :rules="lastNameRules"></v-text-field>

        <v-text-field id="phone" @change="checkCompra" v-model="phone" :rules="phoneRules"
          label="Teléfono"></v-text-field>

        <v-text-field id="creditCard" @change="checkCompra" v-model="creditCard"
          label="Tarjeta de Crédito"></v-text-field>

        <v-text-field id="email" @change="checkCompra" v-model="email" label="Email" :rules="emailRules"></v-text-field>

        <v-text-field id="ticket" @change="checkCompra" v-model="ticket" label="Número de entradas" type="number" min="1"
          :max="this.$store.state.eventoCompra.stock"></v-text-field>

        <v-btn type="submit" block class="mt-2" v-on:click="comprarEvento" :disabled="comprarDisabled">Aceptar</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "EventComponent",
  data: () => ({
    comprarDisabled: true,
    firstName: "",
    firstNameRules: [
      (value) => {
        if (value?.length > 2) return true;

        return "El nombre debe contener al menos 3 carácteres.";
      },
    ],
    lastName: "",
    lastNameRules: [
      (value) => {
        if (/[^0-9]/.test(value)) return true;

        return "El apellido no puede contener digitos.";
      },
    ],
    phone: "",
    phoneRules: [
      (value) => {
        if (value?.length == 9 && /[0-9-]+/.test(value)) return true;
        return "El número de teléfono necesita tener al menos 9 digitos.";
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
        return "Debe ser un Email valido.";
      },
    ],
    creditCard: "",
    ticket: 0,
  }),
  methods: {
    checkCompra() {
      if (
        document.getElementById("firstName")?.value &&
        document.getElementById("lastName")?.value &&
        document.getElementById("phone")?.value &&
        document.getElementById("creditCard")?.value &&
        document.getElementById("email")?.value && document.getElementById("ticket")?.value > 0 && document.getElementById("ticket")?.value <= this.$store.state.eventoCompra.stock
      ) {
        this.comprarDisabled = false;
      } else {
        this.comprarDisabled = true;
      }
    },
    async comprarEvento() {
      this.checkCompra();
      if(this.comprarDisabled == false){
        this.$store.dispatch("comprarEvento", document.getElementById("ticket")?.value);
        this.$router.push(`/`);
      }
    },
  },
  async created() {
    this.$store.dispatch("fetchEvento");
  },
};
</script>

<style scoped>
img {
  height: 250px;
  width: 200px;
}

.superior {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 800px;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-left: 300px;
  margin-top: 100px;
  margin-bottom: 50px;
  height: 100%;
}

.v-sheet {
  margin-left: 100px !important;
}
</style>