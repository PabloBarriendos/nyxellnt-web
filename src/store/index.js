import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    userList: []
  },
  mutations: {
    increment(state, value) {
      state.counter += value
    },
    decrement(state) {
      state.counter--
    },
    initUsers(state, users) {
      state.userList = users
    }
  },
  actions: {
    fetchUsers({ commit }) {
      fetch('https://dummy.restapiexample.com/api/v1/employees')
        .then(response => response.json())
        .then(response => {
          console.log(`data ${response.data}`)

          commit('initUsers', response.data)
        })
    }
  },
  modules: {
  }
})
