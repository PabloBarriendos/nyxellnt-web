import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    datoInutil: null,
    idFestival: null,
    festivalCompra: {},
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
    setFestivalCompra(state, festivalCompra) {
      state.festivalCompra = festivalCompra;
    },
    setIdFestival(state, idFestival) {
      state.idFestival = idFestival;
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
    initFestivales(state, events) {
      state.eventList = events;
    },
    cambiarShowFestivales(state, events) {
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
      context.commit("cambiarShowFestivales", events);
    },
    buscar({ commit }, search) {
      let resultados = this.state.eventList.filter(item => {
        if (item.nombre.toLowerCase().includes(search) || item.artistas.toLowerCase().includes(search)) {
          return item
        }
      });
      commit("cambiarShowFestivales", resultados);
    },
    buscarOperacion({ commit }, search) {
      let resultados = this.state.misComprasList.filter(item => {
        if (item.festival.nombre.toLowerCase().includes(search) || item.festival.artistas.toLowerCase().includes(search)) {
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
      let rol = datos.rol;

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
            rol: rol,
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
    async cargarFestivales({ commit }) {
      await fetch('https://nyxellnt-api-2.azurewebsites.net/festival')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          commit("initFestivales", data);
          commit("cambiarShowFestivales", data);
        })
    },
    async requestFiltroHome({ commit }, datos) {
      let mes = datos.mes;
      let ordenPrecio = datos.ordenPrecio;

      if (mes == 'Todas las categorías' && ordenPrecio == null) {
        commit("cambiarShowFestivales", this.state.eventList);
      }
      if (mes != null && mes != 'Todas las categorías' && ordenPrecio == null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/festival?mes=${mes}`)
          .then(response => response.json())
          .then(data => {
            commit("cambiarShowFestivales", data);
          })
          .catch(error => console.error(error));
      }
      if ((mes == null || mes == 'Todas las categorías') && ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/festival?ordenarPrecio=${ordenPrecio}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            commit("cambiarShowFestivales", data);
          })
          .catch(error => console.error(error));
      }
      if (mes != null && mes != 'Todas las categorías' && ordenPrecio != null) {
        await fetch(`https://nyxellnt-api-2.azurewebsites.net/festival?mes=${mes}&ordenarPrecio=${ordenPrecio}`)
          .then(response => response.json())
          .then(data => {
            commit("cambiarShowFestivales", data);
          })
          .catch(error => console.error(error));
      }
    },
    async getOperaciones({ commit, dispatch }) {
      await dispatch("cargarCookiesUsuario");

      if (this.state.user.idUsuario) {
        let listaOperaciones = [];
        let listaFestivales = [];
        let resultados = [];

        await fetch(
          `https://nyxellnt-api-2.azurewebsites.net/operacion/usuario/${this.state.user.idUsuario}`
        )
          .then((response) => response.json())
          .then((data) => (listaOperaciones = data))
          .catch((error) => console.error(error));

        await fetch(`https://nyxellnt-api-2.azurewebsites.net/festival`)
          .then((response) => response.json())
          .then((data) => (listaFestivales = data))
          .catch((error) => console.error(error));

        listaOperaciones.forEach((operacion) => {
          listaFestivales.forEach((festival) => {
            if (operacion.idFestival == festival.idFestival) {
              resultados.push({ operacion, festival });
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
    async setIdFestivalCompra({ commit }, idFestival) {
      document.cookie = `idFestivalCompra=${idFestival}`;
      commit("setIdFestival", idFestival);
    },
    async comprarFestival({ commit }, ticket) {

      console.log(this.state.idFestival);
      console.log(this.state.user.idUsuario);
      console.log(ticket);
      console.log(this.state.festivalCompra.precioEntrada * ticket);

      // POST operacion
      await fetch("https://nyxellnt-api-2.azurewebsites.net/operacion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idOperacion: 0,
          idFestival: this.state.idFestival,
          idUsuario: this.state.user.idUsuario,
          numEntradasCompradas: ticket,
          precioTotal: this.state.festivalCompra.precioEntrada * ticket
        }),
      });

      // PUT festival
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/festival/${this.state.festivalCompra.idFestival}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            idFestival: this.state.festivalCompra.idFestival,
            nombre: this.state.festivalCompra.nombre,
            artistas: this.state.festivalCompra.artistas,
            descripcion: this.state.festivalCompra.descripcion,
            localidad: this.state.festivalCompra.localidad,
            fecha: this.state.festivalCompra.fecha,
            precioEntrada: this.state.festivalCompra.precioEntrada,
            stock:
              this.state.festivalCompra.stock - ticket,
            mes: this.state.festivalCompra.mes,
          }),
        }
      );

      commit("setDatoInutil", null);
    },
    async fetchFestival({ commit, dispatch }) {
      let idFestivalCookie = await dispatch("getCookie", "idFestivalCompra");
      if(idFestivalCookie){
        commit("setIdFestival", idFestivalCookie);
      }
      await fetch(
        `https://nyxellnt-api-2.azurewebsites.net/festival/${this.state.idFestival}`
      )
        .then((response) => response.json())
        .then((data) => {
          commit("setFestivalCompra", data);
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
