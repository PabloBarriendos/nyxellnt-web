<template>
  <v-app>
    <HeaderComponent />
    <HomeComponent />
    <footerComponent />

    <EventComponent />
    <footerComponent />

    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />

    <MisEventosComponent />
    <footerComponent />

    <v-main>
      <MisEventosCardComponent />
      <PersonalInformationComponent />

    </v-main>
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
  }),
};
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>
