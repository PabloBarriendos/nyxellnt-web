<template>
    <v-container class="container">
        <div class="superior">
            <img src="../photo/R.jpeg">
            <div>
                <v-card-title>
                    40 Aniversario Rock&Rios
                </v-card-title>
                <v-card-subtitle>
                    Miguel Ríos - Wizink Center de Madrid - Rock
                </v-card-subtitle>
                <v-card-text>
                    Cuarenta años, en apariencia, no son nada, pero cuando se celebran ha de hacerse a lo grande, y esta
                    ocasión lo merece, pues han pasado cuatro décadas de las dos veladas del Rock & Ríos en el Pabellón de
                    la Ciudad Deportiva del Real Madrid los días 5 y 6 de marzo de 1982.
                </v-card-text>
                <v-card-text>
                    2023-03-11
                </v-card-text>
            </div>
            <button></button>
        </div>

        <v-sheet width="300" class="mx-auto">
            <v-form fast-fail @submit.prevent>
                <v-text-field v-model="firstName" label="Nombre" :rules="firstNameRules"></v-text-field>

                <v-text-field v-model="lastName" label="Apellidos" :rules="lastNameRules"></v-text-field>

                <v-text-field v-model="phone" :rules="phoneRules" label="Teléfono"></v-text-field>

                <v-text-field v-model="creditCard" label="Tarjeta de Crédito" :rules="creditCardRules"></v-text-field>

                <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>

                <v-text-field v-model="ticket" label="Número de entradas" type="number"></v-text-field>

                <v-btn type="submit" block class="mt-2">Aceptar</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>
  
<script>
export default {
    name: "EventComponent",

    data: () => ({
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
        ]
    }),
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
}

.v-sheet {
    margin-left: 100px !important;
}
</style>