import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idEvento: null,
    eventoCompra: {},
    user: {},
    userLogged: false,
    counter: 1,
    eventList: [],
    showEventList: [],
    userList: [],
    misComprasList: [],
  },
  mutations: {
    setEventoCompra(state, eventoCompra) {
      state.eventoCompra = eventoCompra;
    },
    setIdEvento(state, idEvento) {
      state.idEvento = idEvento;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserLogged(state, userLogged) {
      state.userLogged = userLogged;
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
    setMisComprasList(state, list){
      state.misComprasList = list;
    },
    initUsers(state, users) {
      state.userList = users;
    },
  },
  actions: {
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
              commit("setUserLogged", true);
              document.cookie = `userId=${element.idUsuario}`;
              document.cookie = `userNombre=${element.nombre}`;
              document.cookie = `userApellido=${element.apellido}`;
              document.cookie = `userEmail=${element.email}`;
              document.cookie = `userPassword=${element.password}`;
            }
          });
        })
        .catch((error) => console.error(error));
    },
    async register({ commit }, datos) {
      let nombre = datos.nombre;
      let apellido = datos.apellido;
      let email = datos.email;
      let password = datos.password;

      await fetch(
        "https://nyxellnt-api-2.azurewebsites.net/usuario",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
          }),
        }
      );

      await fetch("https://nyxellnt-api-2.azurewebsites.net/usuario")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          if (
            element.email == email &&
            element.password == password
          ) {
            commit("setUser", element);
            commit("setUserLogged", true);
            document.cookie = `user=${element}`;
          } else {
            commit("setUserLogged", false);
          }
        });
      })
      .catch((error) => console.error(error));
    },
    logout({ commit }){
      commit("setUser", {});
      commit("setUserLogged", false);
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
    async getOperaciones({commit}){
      let listaOperaciones = [];
      let listaEventos = [];
      let resultados = [];

      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/operacion/idUsuario/${this.state.user.idUsuario}`
      )
        .then((response) => response.json())
        .then((data) => (listaOperaciones = data))
        .catch((error) => console.error(error));
  
      await fetch(`https://nyxellnt-api-2.azurewebsites.net/evento`)
        .then((response) => response.json())
        .then((data) => (listaEventos = data))
        .catch((error) => console.error(error));
  
      listaOperaciones.forEach((operacion) => {
        listaEventos.forEach((evento) => {
          if (operacion.idEvento == evento.idEvento) {
            resultados.push({ operacion, evento });
          }
        });
      });

      commit("setMisComprasList", resultados);

    },
    async setIdEventoCompra({commit}, idEvento){
      commit("setIdEvento", idEvento);
    },
    async comprarEvento(ticket) {

      // POST operacion
      await fetch("https://nyxellnt-api-2.azurewebsites.net/operacion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idOperacion: 0,
          idEvento: this.state.idEvento,
          idUsuario: this.state.user.idUsuario,
          numEntradasCompradas: ticket,
          precioTotal: this.state.eventoCompra.precioEntrada * ticket,
          fechaCompra: "string",
        }),
      });

      // PUT evento
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/evento/${this.state.eventoCompra.idEvento}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            idEvento: this.state.eventoCompra.idEvento,
            nombre: this.state.eventoCompra.nombre,
            cantante: this.state.eventoCompra.cantante,
            descripcion: this.state.eventoCompra.descripcion,
            localidad: this.state.eventoCompra.localidad,
            fecha: this.state.eventoCompra.fecha,
            precioEntrada: this.state.eventoCompra.precioEntrada,
            stock:
              this.state.eventoCompra.stock - ticket,
            categoria: this.state.eventoCompra.categoria,
          }),
        }
      );

      this.$router.push(`/`);
    },
    async fetchEvento({commit}, idEvento){
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/evento/${idEvento}`
      )
        .then((response) => response.json())
        .then((data) => {
          commit("setEventoCompra", data);
        })
        .catch((error) => console.error(error));

    }
    // getCookie(payload) {
    //   const { var1 } = payload;
    //   console.log("var1 "+var1)
    //   var cookies = document.cookie;
    //   var cookiesArray = cookies.split(";");
    //   var miCookieValue = "";
    //   console.log(`${var1}=`)
    //   for (var i = 0; i < cookiesArray.length; i++) {
    //     var cookie = cookiesArray[i];
    //     while (cookie.charAt(0) == " ") {
    //       cookie = cookie.substring(1);
    //     }
    //     if (cookie.indexOf(`${var1}=`) == 0) {
    //       miCookieValue = cookie.substring(`${var1}=`.length, cookie.length);
    //       break;
    //     }
    //   }
    //   console.log(miCookieValue)
    //   return miCookieValue;
    // },
    // async cargarCookiesUsuario({ commit, dispatch }){
    //   console.log("ey2");
    //   console.log(dispatch("getCookie", {var1: "userId"}));
    //   const idUsuario = dispatch("getCookie", {var1: "userId"});
    //   const nombre = dispatch("getCookie", {var1: "userNombre"});
    //   const apellido = dispatch("getCookie", {var1: "userApellido"});
    //   const email = dispatch("getCookie", {var1: "userEmail"});
    //   const password = dispatch("getCookie", {var1: "userPassword"});

    //   console.log("nombre "+nombre)

    //   if(idUsuario && nombre && apellido && email && password){
    //     commit("setUser", {idUsuario: idUsuario, nombre: nombre, apellido: apellido, email: email, password: password});
    //     commit("setUserLogged", true);
    //   }

    // },
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
