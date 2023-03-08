<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="$store.commit('increment', -1)">Decrementar</button>
    <div>Valor del contador: {{ $store.state.counter }}</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    // this.$store.commit('initUsers', [
    //   { id: 0, name: 'sample' },
    //   { id: 1, name: 'sample2' },
    // ])
    // this.$store.dispatch('fetchUsers')
    this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
