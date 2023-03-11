<template>
  <v-app id="app">
    <HeaderComponent/>

    <div v-if="showHome">
      <HomeComponent/>
    </div>
    <div v-if="showEvent">
      <EventComponent/>
    </div>
    <div v-if="showMisEventos">
      <MisEventosComponent/>
    </div>
    <div v-if="showHome">
      <MisEventosCardComponent/>
    </div>
    <div v-if="showHome">
      <PersonalInformationComponent/>
    </div>
    <!-- <v-main>
      <MisEventosCardComponent/>
      <PersonalInformationComponent/>
    </v-main> -->
    
    <!-- <router-link to="/">Go to Home</router-link>
    <router-link to="/evento">Go to Evento</router-link>
    <router-view /> -->

    <footerComponent/>
  </v-app>

</template>

<script>
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import footerComponent from './components/footerComponent';
import EventComponent from './components/EventComponent';
import PersonalInformationComponent from './components/PersonalInformationComponent';
import MisEventosCardComponent from './components/MisEventosCardComponent';
import MisEventosComponent from './components/MisEventosComponent'

export default {
  name: 'App',

  components: {
    HomeComponent,
    footerComponent,
    HeaderComponent,
    EventComponent,
    PersonalInformationComponent,
    MisEventosCardComponent,
    MisEventosComponent
  },
  data: () => ({
    showHome: false,
    showEvent: false,
    showMisEventos: false,
  }),
};
</script>

<style scoped>
  .v-main{
    padding: 0 !important;
  }
</style>
