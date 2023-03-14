import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datoInutil: null,
    idEvento: null,
    eventoCompra: {},
    user: {},
    showLoginPopUp: false,
    userLogged: false,
    counter: 1,
    eventList: [],
    showEventList: [],
    userList: [],
    misComprasList: [],
    showMisComprasList: [],
  },
  mutations: {
    setDatoInutil(state, datoInutil) {
      state.datoInutil = datoInutil;
    },
    setEventoCompra(state, eventoCompra) {
      state.eventoCompra = eventoCompra;
    },
    setIdEvento(state, idEvento) {
      state.idEvento = idEvento;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoginPopUp(state, showLoginPopUp) {
      state.showLoginPopUp = showLoginPopUp;
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
    setMisComprasList(state, list) {
      state.misComprasList = list;
    },
    setShowMisComprasList(state, list) {
      state.showMisComprasList = list;
    },
    initUsers(state, users) {
      state.userList = users;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    },
    setLoginPopUp(context, showLoginPopUp) {
      context.commit("setLoginPopUp", showLoginPopUp);
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
    buscarOperacion({ commit }, search) {
      let resultados = this.state.misComprasList.filter(item => {
        if (item.evento.nombre.toLowerCase().includes(search) || item.evento.cantante.toLowerCase().includes(search)) {
          return item
        }
      });
      commit("setShowMisComprasList", resultados);
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
    logout({ commit }) {
      document.cookie = `userId=`;
      document.cookie = `userNombre=`;
      document.cookie = `userApellido=`;
      document.cookie = `userEmail=`;
      document.cookie = `userPassword=`;
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
    async requestFiltroHome({ commit }, datos) {
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
    async getOperaciones({ commit, dispatch }) {
      await dispatch("cargarCookiesUsuario");

      if (this.state.user.idUsuario) {
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
        commit("setShowMisComprasList", resultados);

      }
    },
    async requestFiltroOperaciones({ commit }, ordenFecha) {
      console.log(ordenFecha)
      console.log("Antes: ");
      console.log(this.state.showMisComprasList);
      console.log(this.state.showMisComprasList[0].operacion.fechaCompra)
      console.log(Date.parse(this.state.showMisComprasList[0].operacion.fechaCompra))
      if (ordenFecha != null) {
        if (ordenFecha == true) {
          this.state.showMisComprasList.sort((a, b) => {
            let dateA = a.operacion.fechaCompra.split("-");
            let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0])
            let dateB = b.operacion.fechaCompra.split("-");
            let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0])

            console.log(finalDateA)

            return (finalDateB - finalDateA)
          });
        } else {
          this.state.showMisComprasList.sort((a, b) => {
            let dateA = a.operacion.fechaCompra.split("-");
            let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0])
            let dateB = b.operacion.fechaCompra.split("-");
            let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0])

            return (finalDateA - finalDateB)
          });
        }

        console.log("Despues: ");
        console.log(this.state.showMisComprasList);

        commit("setDatoInutil", null);

      }
    },
    async setIdEventoCompra({ commit }, idEvento) {
      document.cookie = `idEventoCompra=${idEvento}`;
      commit("setIdEvento", idEvento);
    },
    async comprarEvento({ commit }, ticket) {

      console.log(this.state.idEvento);
      console.log(this.state.user.idUsuario);
      console.log(ticket);
      console.log(this.state.eventoCompra.precioEntrada * ticket);

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
          precioTotal: this.state.eventoCompra.precioEntrada * ticket
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

      commit("setDatoInutil", null);
    },
    async fetchEvento({ commit, dispatch }) {
      let idEventoCookie = await dispatch("getCookie", "idEventoCompra");
      if(idEventoCookie){
        commit("setIdEvento", idEventoCookie);
      }
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/evento/${this.state.idEvento}`
      )
        .then((response) => response.json())
        .then((data) => {
          commit("setEventoCompra", data);
        })
        .catch((error) => console.error(error));

    },
    getCookie({ commit }, stringCookie) {
      var cookies = document.cookie;
      var cookiesArray = cookies.split(";");
      var miCookieValue = "";
      for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i];
        while (cookie.charAt(0) == " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(`${stringCookie}=`) == 0) {
          miCookieValue = cookie.substring(`${stringCookie}=`.length, cookie.length);
          break;
        }
      }
      commit("setDatoInutil", null);
      return miCookieValue;
    },
    async cargarCookiesUsuario({ commit, dispatch }) {
      let idUsuario = await dispatch("getCookie", "userId");
      let nombre = await dispatch("getCookie", "userNombre");
      let apellido = await dispatch("getCookie", "userApellido");
      let email = await dispatch("getCookie", "userEmail");
      let password = await dispatch("getCookie", "userPassword");

      if (idUsuario && nombre && apellido && email && password) {
        commit("setUser", { idUsuario: idUsuario, nombre: nombre, apellido: apellido, email: email, password: password });
        commit("setUserLogged", true);
      }

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
