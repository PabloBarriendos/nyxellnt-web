<template>
    <v-dialog v-model="showPersonalInfoPopUp" persistent width="1024">
        <v-card>
            <v-card-title>
                <span class="text-h5">Información personal</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-card-text label="Nombre"><strong>Nombre: </strong> </v-card-text>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-card-text label="Apellidos"><strong>Apellido: </strong> </v-card-text>
                        </v-col>
                        <v-col cols="12">
                            <v-card-text label="Email"><strong>Email: </strong> </v-card-text>
                        </v-col>
                        <v-col cols="12">
                            <v-card-text label="Contraseña" type="password"><strong>Contraseña: </strong> ***********</v-card-text>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="showPersonalInfoPopUp = false">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PersonalInformationComponent",
    data: () => ({
        showPersonalInfoPopUp: true,
    }),
}
</script>
