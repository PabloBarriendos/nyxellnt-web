<template>
  <v-app>
    
    <HeaderComponent/>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import HeaderComponent from './components/HeaderComponent';

export default {
  name: 'App',

  components: {
    HelloWorld,
    HeaderComponent
  },

  data: () => ({
    //
  }),
};
</script>
