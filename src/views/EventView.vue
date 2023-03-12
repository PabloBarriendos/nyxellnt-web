<template>
    <v-container class="container">
        <div class="superior">
            <img src="../photo/R.jpeg">
            <div>
                <v-card-title>
                    {{this.resultados.nombre}}
                </v-card-title>
                <v-card-subtitle>
                    {{this.resultados.cantante}} - {{this.resultados.localidad}} - {{this.resultados.categoria}}
                </v-card-subtitle>
                <v-card-text>
                    {{this.resultados.descripcion}}
                </v-card-text>
                <v-card-text>
                    {{this.resultados.fecha}}
                </v-card-text>
                <v-card-text>
                    {{this.resultados.precioEntrada}}
                </v-card-text>
            </div>
        </div>

        <v-sheet width="300" class="mx-auto">
            <v-form fast-fail @submit.prevent>
                <v-text-field v-model="firstName" label="Nombre" :rules="firstNameRules"></v-text-field>

                <v-text-field v-model="lastName" label="Apellidos" :rules="lastNameRules"></v-text-field>

                <v-text-field v-model="phone" :rules="phoneRules" label="Teléfono"></v-text-field>

                <v-text-field v-model="creditCard" label="Tarjeta de Crédito" :rules="creditCardRules"></v-text-field>

                <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>

                <v-text-field v-model="ticket" label="Número de entradas" type="number"></v-text-field>

                <v-btn type="submit" block class="mt-2" to="/mis-eventos">Aceptar</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>
  
<script>

export default {
    name: "EventComponent",
    data: () => ({
        resultados: [],
        firstName: '',
        firstNameRules: [
            value => {
                if (value?.length > 3) return true

                return 'El nombre debe contener al menos 3 carácteres.'
            },
        ],
        lastName: '',
        lastNameRules: [
            value => {
                if (/[^0-9]/.test(value)) return true

                return 'El apellido no puede contener digitos.'
            },
        ],
        phone: '',
        phoneRules: [
            value => {
                if (value?.length > 9 && /[0-9-]+/.test(value)) return true
                return 'El número de teléfono necesita tener al menos 9 digitos.'
            }
        ],
        email: '',
        emailRules: [
            value => {
                if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
                return 'Debe ser un Email valido.'
            }
        ],
        creditCard: '',
        creditCardRules: [
            value => {
                if (/^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/i.test(value)) {
                    const cardNumber = value.replace(/-/g, '');
                    let sum = 0;
                    for (let i = 0; i < cardNumber.length; i++) {
                        let num = parseInt(cardNumber[i]);
                        if ((i + cardNumber.length) % 2 === 0) {
                            num *= 2;
                            if (num > 9) num -= 9;
                        }
                        sum += num;
                    }
                    return sum % 10 === 0 ? true : 'Debe ser un número de tajeta de crédito válido.';
                } else {
                    return 'Debe ser un número de tajeta de crédito válido.';
                }
            }
        ],
        ticket: 0
    }),
    async mounted() {
        
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/${this.$route.query.id}`)
        .then(response => response.json())
        .then(data => this.resultados = data)
        .catch(error => console.error(error));
        console.log(this.resultados)
    },
}
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