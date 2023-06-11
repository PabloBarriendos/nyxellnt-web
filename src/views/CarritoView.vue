<template>
  <v-container class="carrito-container">
    <h1>Carrito</h1>
    <div class="btn-comprar">
      <div class="precioTotal">
        <span>Precio Total:</span><span>{{ precioTotal }} €</span>
      </div>
      <v-btn color="success" :disabled="listaEntradasCarrito.length === 0" variant="text"
        v-on:click="openFinalizarCompra()">
        <v-icon size="40">mdi-cart</v-icon> Finalizar Compra
      </v-btn>
    </div>
    <div class="entradas-section">
      <h2>Entradas</h2>
      <div class="noData" v-if="listaEntradasCarrito.length < 1">
        <v-icon>mdi-information</v-icon>
        <p>No hay festivales añadidos al carrito</p>
      </div>
      <EntradaCarritoComponent v-for="item in listaEntradasCarrito" :key="item.festival.idFestival"
        :festival="item.festival" @changedEntradas="recalcularPrecio"
        @deletedEntradaCarrito="cargarListaEntradasCarrito" />
    </div>
    <div class="productos-section">
      <h2>Productos</h2>
      <div class="noData" v-if="listaProductosCarrito.length < 1">
        <v-icon>mdi-information</v-icon>
        <p>No hay productos añadidos al carrito</p>
      </div>
      <!-- <ProductoCarritoComponent
        v-for="festival in $store.state.showFestivalList"
        :key="festival.idFestival"
        :id="festival.idFestival"
        :titulo="festival.nombre"
        :descripcion="festival.descripcion"
        :precio="festival.precioEntrada"
      /> -->
      <!-- <ProductoCarritoComponent
        :key="$store.state.showFestivalList[1].idFestival"
        :id="$store.state.showFestivalList[1].idFestival"
        :titulo="$store.state.showFestivalList[1].nombre"
        :descripcion="$store.state.showFestivalList[1].descripcion"
        :precio="$store.state.showFestivalList[1].precioEntrada"
        :imagen="$store.state.showFestivalList[1].imagen"
      /> -->
    </div>

    <!-- POPUP DE COMPRA -->
    <v-dialog v-model="showCompraPopUp" persistent width="1024">
      <v-card class="customClass">
        <v-card-title class="compraTitle">
          <span class="text-h5">Finalizar compra</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- DATOS DE PAGO -->
              <v-card-subtitle class="subtitle">
                <span>Datos de pago</span>
              </v-card-subtitle>
              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="tarjetaCredito" id="tarjetaCredito" label="Tarjeta de crédito"
                  @change="checkCompraValida" required :rules="tarjetaCreditoRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="fechaCaducidad" id="fechaCaducidad" label="Fecha caducidad"
                  @change="checkCompraValida" required :rules="fechaCaducidadRules"></v-text-field>
              </v-col>

              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="nombreTitular" id="nombreTitular" label="Nombre del titular"
                  @change="checkCompraValida" required :rules="nombreTitularRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="cvv" id="cvv" label="CVV" @change="checkCompraValida" required
                  :rules="cvvRules"></v-text-field>
              </v-col>

              <!-- DATOS DE RECEPTOR -->
              <v-card-subtitle class="subtitle">
                <span>Datos del receptor</span>
              </v-card-subtitle>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="nombre" id="nombre" label="Nombre" @change="checkCompraValida" required
                  :rules="nombreRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="apellidos" id="apellidos" label="Apellidos" @change="checkCompraValida" required
                  :rules="apellidosRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="correo" id="correo" label="Correo" @change="checkCompraValida" required
                  :rules="correoRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="dni" id="dni" label="DNI" @change="checkCompraValida" required
                  :rules="dniRules"></v-text-field>
              </v-col>

              <!-- ENTREGA -->
              <v-card-subtitle class="subtitle">
                <span>Datos de entrega</span>
              </v-card-subtitle>
              <v-col cols="12" sm="8" md="8">
                <v-text-field v-model="direccion" id="direccion" label="Dirección" @change="checkCompraValida"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="codigoPostal" id="codigoPostal" label="Código postal" @change="checkCompraValida"
                  required :rules="codigoPostalRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea v-model="notasEntrega" :no-resize="true" id="notasEntrega"
                  label="Instrucciones de entrega (Opcional)"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="compraBotones">
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="() => (showCompraPopUp = false)">Cerrar</v-btn>
          <v-btn color="success" variant="text" @click="finalizarCompra" :disabled="compraInvalida">Comprar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import EntradaCarritoComponent from "../components/carrito/EntradaCarritoComponent.vue";
// import ProductoCarritoComponent from "../components/carrito/ProductoCarritoComponent.vue";

export default {
  name: "CarritoComponent",
  components: {
    EntradaCarritoComponent,
    // ProductoCarritoComponent,
  },
  data: () => ({
    listaEntradasCarrito: [],
    listaProductosCarrito: [],
    showCompraPopUp: false,
    precioTotal: 0,
    //datos Formulario  // CAMBIAR BOOLEAN
    compraInvalida: false,
    tarjetaCredito: '',
    fechaCaducidad: '',
    nombreTitular: '',
    cvv: '',
    nombre: '',
    apellidos: '',
    correo: '',
    dni: '',
    direccion: '',
    codigoPostal: '',
    notasEntrega: '',
    tarjetaCreditoRules: [
      (value) => {
        // Eliminar espacios en blanco y guiones de la cadena de entrada
        const cleanedValue = value.replace(/\s/g, '').replace(/-/g, '');
        // Verificar que solo contenga dígitos
        if (!/^\d+$/.test(cleanedValue)) {
          return "La tarjeta de crédito solo puede contener dígitos.";
        }
        // Verificar longitud de la tarjeta de crédito
        if (cleanedValue.length !== 16) {
          return "La tarjeta de crédito debe tener 16 dígitos.";
        }
        return true; // La tarjeta de crédito es válida
      },
    ],
    fechaCaducidadRules: [
      (value) => {
        if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return true;
        return "El formato de fecha debe ser MM/AA (mes y año).";
      },
    ],
    nombreTitularRules: [
      (value) => {
        if (/^[a-zA-Z]+$/.test(value)) return true;
        return "Solo puede contener letras.";
      },
    ],
    nombreRules: [
      (value) => {
        if (value?.length > 2 && /^[a-zA-Z]+$/.test(value)) return true;

        return "El nombre debe contener al menos 3 carácteres y no contener números ni simbolos.";
      },
    ],
    apellidosRulesRules: [
      (value) => {
        if (/^[a-zA-Z]+$/.test(value)) return true;
        return "El apellido solo puede contener letras.";
      },
    ],
    correoRulesRules: [
      (value) => {
        if (/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) return true;
        return "Debe ser un Email valido.";
      }
    ],
    dniRules: [
      (value) => {
        if (/^\d{8}$/.test(value)) return true;
        return "El número de DNI debe tener 8 dígitos.";
      },
    ],
    codigoPostalRules: [
      (value) => {
        if (/^\d{5}$/.test(value)) return true;
        return "El código postal debe contener exactamente 5 dígitos numéricos.";
      },
    ]
  }),
  created() {
    this.listaEntradasCarrito = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
    if (!this.listaEntradasCarrito) {
      this.listaEntradasCarrito = [];
      localStorage.setItem('listaEntradasCarrito', JSON.stringify(this.listaEntradasCarrito));
    } else {
      this.listaEntradasCarrito.forEach(item => {
        this.precioTotal = this.precioTotal + (item.entradas * item.festival.precioEntrada + item.entradasVip * item.festival.precioEntradaVip);
      });
    }
  },
  methods: {
    cargarListaEntradasCarrito() {
      this.listaEntradasCarrito = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
      this.recalcularPrecio();
    },
    cargarListaProductosCarrito() {
      this.listaProductosCarrito = JSON.parse(localStorage.getItem('listaProductosCarrito'));
    },
    recalcularPrecio() {
      this.precioTotal = 0;
      this.listaEntradasCarrito = JSON.parse(localStorage.getItem('listaEntradasCarrito'));
      if (this.listaEntradasCarrito) {
        this.listaEntradasCarrito.forEach(item => {
          this.precioTotal = this.precioTotal + (item.entradas * item.festival.precioEntrada + item.entradasVip * item.festival.precioEntradaVip);
        });
      }
    },
    openFinalizarCompra() {
      this.showCompraPopUp = true;
    },
    checkCompraValida() {
      if (this.tarjetaCredito && this.fechaCaducidad && this.nombreTitular && this.cvv && this.nombre && this.apellidos && this.correo && this.dni && this.direccion && this.codigoPostal) {
        this.compraInvalida = false;
      } else {
        this.compraInvalida = false;
      }
    },
    finalizarCompra() {
      console.log('compra finalizada', this.notasEntrega);

      this.listaEntradasCarrito = JSON.parse(localStorage.getItem('listaEntradasCarrito'));

      this.listaEntradasCarrito.forEach(item => {
        const datos = {
          festival: item.festival,
          entradas: item.entradas,
          entradasVip: item.entradasVip
        }
        // TODO
        console.log('item', item);
        this.$store.dispatch("comprarFestival", datos);

      });

      localStorage.removeItem('listaEntradasCarrito');
      this.$router.push(`/compraFinalizada`);
    }
  },
};
</script>

<style lang="scss" scoped>
.compraTitle {
  padding: 36px 36px 0 36px !important;
}

.subtitle {
  width: 100%;
  padding: 0 12px;
  margin-top: 40px;
  font-size: 16px;
  font-weight: bold;
}

#notasEntrega {
  resize: none;
}

.compraBotones {
  padding: 0 24px 20px !important;
}

.carrito-container {
  margin: 0;
  padding: 0;
  max-width: 100%;
  margin-top: 160px;

  h1 {
    width: 100%;
    text-align: center;
    font-size: 54px;
  }

  .btn-comprar {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 40px 0;

    .precioTotal {
      display: flex;
      align-items: center;
      margin-right: 20px;

      span {
        font-size: 24px;
        font-weight: bold;

        &:first-of-type {
          margin-right: 8px;
        }
      }
    }

    .v-btn {
      padding: 24px;

      .v-icon {
        margin-right: 10px;
      }
    }
  }

  .noData {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 60px 0;
    padding: 0 40px;

    .v-icon {
      margin-right: 12px;
    }

    p {
      margin-bottom: 0;
      font-size: 22px;
      color: gray;
    }
  }

  .entradas-section,
  .productos-section {
    margin: 60px 0;

    h2 {
      color: black;
      text-transform: uppercase;
      font-size: 24px;
      padding: 0 40px;
      margin-bottom: 20px;
      width: 100%;
    }

    .card-component {
      margin: 20px;
    }
  }

  .productos-section {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
  }

  .btn-buscar {
    width: 80px;
    margin-left: 40px;
    padding: 0;
  }

  .btn-filtrar {
    padding: 0;
    margin-right: 100%;
  }
}

@media only screen and (max-width: 500px) {
  .carrito-container {
    .btn-comprar {
      flex-wrap: wrap-reverse;

      .precioTotal {
        margin-right: 0;
        margin: 20px;
      }
    }
  }
}
</style>