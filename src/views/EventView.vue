<template>
  <v-container class="container">
    <div class="superior">
      <img src="../photo/R.jpeg" />
      <div>
        <v-card-title>
          {{ this.resultados.nombre }}
        </v-card-title>
        <v-card-subtitle>
          {{ this.resultados.cantante }} - {{ this.resultados.localidad }} -
          {{ this.resultados.categoria }}
        </v-card-subtitle>
        <v-card-text>
          {{ this.resultados.descripcion }}
        </v-card-text>
        <v-card-text> Fecha evento: {{ this.resultados.fecha }} </v-card-text>
        <v-card-text>
          Precio entrada: {{ this.resultados.precioEntrada }} €
        </v-card-text>
      </div>
    </div>

    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          id="firstName"
          @change="checkCompra"
          v-model="firstName"
          label="Nombre"
          :rules="firstNameRules"
        ></v-text-field>

        <v-text-field
          id="lastName"
          @change="checkCompra"
          v-model="lastName"
          label="Apellidos"
          :rules="lastNameRules"
        ></v-text-field>

        <v-text-field
          id="phone"
          @change="checkCompra"
          v-model="phone"
          :rules="phoneRules"
          label="Teléfono"
        ></v-text-field>

        <v-text-field
          id="creditCard"
          @change="checkCompra"
          v-model="creditCard"
          label="Tarjeta de Crédito"
        ></v-text-field>

        <v-text-field
          id="email"
          @change="checkCompra"
          v-model="email"
          label="Email"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          id="ticket"
          @change="checkCompra"
          v-model="ticket"
          label="Número de entradas"
          type="number"
          min="1"
          :max="this.resultados.stock"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          class="mt-2"
          v-on:click="comprarEvento"
          :disabled="comprarDisabled"
          >Aceptar</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>
  
<script>
export default {
  name: "EventComponent",
  data: () => ({
    comprarDisabled: true,
    resultados: [],
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
        if (value?.length > 8 && /[0-9-]+/.test(value)) return true;
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
        document.getElementById("email")?.value &&
        document.getElementById("ticket")?.value
      ) {
        this.comprarDisabled = false;
      } else {
        this.comprarDisabled = true;
      }
    },
    selectUsuario() {
      var cookies = document.cookie;
      var cookiesArray = cookies.split(";");

      // Buscar la cookie deseada por su nombre
      var miCookieValue = "";
      for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i];
        while (cookie.charAt(0) == " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf("idUsuario=") == 0) {
          miCookieValue = cookie.substring("idUsuario=".length, cookie.length);
          break;
        }
      }

      // Usar el valor de la cookie deseada
      return miCookieValue;
    },
    async comprarEvento() {
      let idUsuario = this.selectUsuario();

      // POST operacion
      await fetch("https://nyxellnt-api-2.azurewebsites.net/operacion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idOperacion: 0,
          idEvento: this.resultados.idEvento,
          idUsuario: idUsuario,
          numEntradasCompradas: document.getElementById("ticket")?.value,
          precioTotal: this.resultados.precioEntrada * document.getElementById("ticket")?.value,
          fechaCompra: "string",
        }),
      });

      // PUT evento
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/evento/${this.resultados.idEvento}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            idEvento: this.resultados.idEvento,
            nombre: this.resultados.nombre,
            cantante: this.resultados.cantante,
            descripcion: this.resultados.descripcion,
            localidad: this.resultados.localidad,
            fecha: this.resultados.fecha,
            precioEntrada: this.resultados.precioEntrada,
            stock:
              this.resultados.stock - document.getElementById("ticket")?.value,
            categoria: this.resultados.categoria,
          }),
        }
      );

      this.$router.push(`/`);
    },
  },
  async mounted() {
    await fetch(
      `https://nyxellnt-api-2.azurewebsites.net/evento/${this.$route.query.id}`
    )
      .then((response) => response.json())
      .then((data) => (this.resultados = data))
      .catch((error) => console.error(error));
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