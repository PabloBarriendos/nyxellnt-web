<template>
  <div class="hello">
    <div>{{ counter }}</div>
    <div>{{ fullName }}</div>
    <button @click="onClick">increment</button>
    <div>
      <div v-for="user in userList"
          :key="user.id">
        {{ user.employee_name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'HelloWorld',
  props: {
    msg: String

  },
  data() {
    return {
      first: 'John',
      last: 'Foo'
    }
  },
  methods: {
    onClick() {
      this.$store.commit('increment', 1)
    }
  },
  computed: {
    cadena() {
      return `valor de cadena ${this.counter}`
    },
    fullName() {
      return `${this.last}, ${this.first}`
    },
    ...mapState(['counter', 'userList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
