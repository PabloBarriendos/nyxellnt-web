import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: null,
    user: null,
    counter: 0,
    userList: [],
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setUsuario(state, user) {
      state.user = user;
    },
    increment(state, value) {
      state.counter += value;
    },
    decrement(state) {
      state.counter--;
    },
    initUsers(state, users) {
      state.userList = users;
    },
  },
  actions: {
    setId(context, id) {
      context.commit("setId", id);
    },
    setUser(context, user) {
      context.commit("setUser", user);
    },
    fetchUsers({ commit }) {
      fetch("https://dummy.restapiexample.com/api/v1/employees")
        .then((response) => response.json())
        .then((response) => {
          console.log(`data ${response.data}`);

          commit("initUsers", response.data);
        });
    },
  },
  getters: {
    getId(state) {
      return state.id;
    },
    getUser(state) {
      return state.user;
    },
  },
  modules: {},
});
