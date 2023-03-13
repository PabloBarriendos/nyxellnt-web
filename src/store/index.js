import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: null,
    user: {},
    showUser: false,
    counter: 1,
    eventList: [],
    showEventList: [],
    userList: [],
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setUser(state, user) {
      state.user = user;
    },
    setShowUser(state, showUser) {
      state.showUser = showUser;
    },
    increment(state, value) {
      state.counter += value;
    },
    decrement(state) {
      state.counter--;
    },
    initEventos(state, events) {
      state.eventList = events;
    },
    cambiarShowEventos(state, events) {
      state.showEventList = events;
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
    setShowEventList(context, events) {
      context.commit("cambiarShowEventos", events);
    },
    buscar({ commit }, search) {
      let resultados = this.state.eventList.filter(item => {
        if (item.nombre.toLowerCase().includes(search) || item.cantante.toLowerCase().includes(search)) {
          return item
        }
      });
      commit("cambiarShowEventos", resultados);
    },
    async login({ commit }, datos) {
      let email = datos.email;
      let password = datos.password;

      await fetch("https://nyxellnt-api-2.azurewebsites.net/usuario")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            if (
              element.email == email &&
              element.password == password
            ) {
              commit("setUser", element);
              document.cookie = `user=${element}`;
            }
          });
        })
        .catch((error) => console.error(error));
    },
    async cargarEventos({ commit }) {
      await fetch('https://nyxellnt-api-2.azurewebsites.net/evento')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          commit("initEventos", data);
          commit("cambiarShowEventos", data);
        })
    },
    async requestFiltro({ commit }, datos) {
      let genero = datos.genero;
      let ordenPrecio = datos.ordenPrecio;

      if (genero == 'Todas las categorías' && ordenPrecio == null) {
        commit("cambiarShowEventos", this.state.eventList);
      }
      if (genero != null && genero != 'Todas las categorías' && ordenPrecio == null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/genero/${genero}`)
          .then(response => response.json())
          .then(data => {
            commit("cambiarShowEventos", data);
          })
          .catch(error => console.error(error));
      }
      if ((genero == null || genero == 'Todas las categorías') && ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/ordenarPrecio/${ordenPrecio}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            commit("cambiarShowEventos", data);
          })
          .catch(error => console.error(error));
      }
      if (genero != null && genero != 'Todas las categorías' && ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento/genero/${genero}/precio/${ordenPrecio}`)
          .then(response => response.json())
          .then(data => {
            commit("cambiarShowEventos", data);
          })
          .catch(error => console.error(error));
      }
    },
    loginUser() {

    },
    fetchUsers({ commit }, payload) {
      console.log(payload)
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
