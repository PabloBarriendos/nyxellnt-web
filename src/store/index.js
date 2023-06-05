import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var link = "http://localhost:80";
// https://nyxellnt-api-2.azurewebsites.net/

export default new Vuex.Store({
  state: {
    datoInutil: null,
    idFestival: null,
    festivalCompra: {},
    user: {},
    paginaHome: false,
    showLoginPopUp: false,
    loading: false,
    userLogged: false,
    counter: 1,
    festivalList: [],
    showFestivalList: [],
    userList: [],
    misComprasList: [],
    showMisComprasList: [],
    mostrarMensajeDelete: false,
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
    setPaginaHome(state, paginaHome) {
      state.paginaHome = paginaHome;
    },
    setLoginPopUp(state, showLoginPopUp) {
      state.showLoginPopUp = showLoginPopUp;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setMensajeDelete(state, mostrartMensajeDelete) {
      state.mostrartMensajeDelete = mostrartMensajeDelete;
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
    initFestivales(state, festivales) {
      state.festivalList = festivales;
    },
    cambiarShowFestivales(state, festivales) {
      state.showFestivalList = festivales;
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
    setPaginaHome(context, paginaHome) {
      context.commit("setPaginaHome", paginaHome);
    },
    setLoginPopUp(context, showLoginPopUp) {
      context.commit("setLoginPopUp", showLoginPopUp);
    },
    setLoading(context, loading) {
      context.commit("setLoading", loading);
    },
    setShowFestivalList(context, festivales) {
      context.commit("cambiarShowFestivales", festivales);
    },
    // buscar({ commit }, search) {
    //   let resultados = this.state.festivalList.filter(item => {
    //     if (item.nombre.toLowerCase().includes(search) || item.artistas.toLowerCase().includes(search) || item.localidad.toLowerCase().includes(search)) {
    //       return item
    //     }
    //   });
    //   return resultados;
    //   // commit("setDatoInutil", null);
    //   // commit("cambiarShowFestivales", resultados);
    // },
    buscarOperacion({ commit }, search) {
      let resultados = this.state.misComprasList.filter((item) => {
        if (
          item.festival.nombre.toLowerCase().includes(search) ||
          item.festival.artistas.toLowerCase().includes(search)
        ) {
          return item;
        }
      });
      commit("setShowMisComprasList", resultados);
    },
    async login({ commit }, datos) {
      let email = datos.email;
      let password = datos.password;

      await fetch(link + "/usuario")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            if (element.email == email && element.password == password) {
              commit("setUser", element);
              commit("setUserLogged", true);
              document.cookie = `userId=${element.idUsuario}`;
              document.cookie = `userNombre=${element.nombre}`;
              document.cookie = `userApellido=${element.apellido}`;
              document.cookie = `userEmail=${element.email}`;
              document.cookie = `userPassword=${element.password}`;
              document.cookie = `userRol=${element.rol}`;
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

      await fetch(link + "/usuario", {
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
      });

      await fetch(link + "/usuario")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            if (element.email == email && element.password == password) {
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
      document.cookie = `userRol=`;
      commit("setUser", {});
      commit("setUserLogged", false);
    },
    async cargarFestivales({ commit }) {
      commit("setLoading", true);
      await fetch(link + "/festival")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          commit("initFestivales", data);
          commit("cambiarShowFestivales", data);
        });
      commit("setLoading", false);
    },
    async requestFiltroHome({ commit }, datos) {
      commit("setLoading", true);
      let stringBuscar = datos.stringBuscar;
      let mes = datos.mes;
      let ordenFecha = datos.ordenFecha;

      let resultados = this.state.festivalList;

      if (mes == null && ordenFecha == null) {
        commit("cambiarShowFestivales", resultados);
      }
      if (mes != null && ordenFecha == null) {
        await fetch(link + `/festival?mes=${mes}`)
          .then((response) => response.json())
          .then((data) => {
            resultados = data;
            commit("cambiarShowFestivales", data);
          })
          .catch((error) => console.error(error));
      }
      if (mes == null && ordenFecha != null) {
        await fetch(link + `/festival?ordenarFecha=${ordenFecha}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            resultados = data;
            commit("cambiarShowFestivales", data);
          })
          .catch((error) => console.error(error));
      }
      if (mes != null && ordenFecha != null) {
        console.log("HOLA");
        await fetch(link + `/festival?mes=${mes}&ordenarFecha=${ordenFecha}`)
          .then((response) => response.json())
          .then((data) => {
            resultados = data;
            commit("cambiarShowFestivales", data);
          })
          .catch((error) => console.error(error));
      }

      resultados = resultados.filter((item) => {
        if (
          item.nombre.toLowerCase().includes(stringBuscar) ||
          item.artistas.toLowerCase().includes(stringBuscar) ||
          item.localidad.toLowerCase().includes(stringBuscar)
        ) {
          return item;
        }
      });
      commit("cambiarShowFestivales", resultados);
      commit("setLoading", false);
    },
    async getOperaciones({ commit, dispatch }) {
      await dispatch("cargarCookiesUsuario");

      if (this.state.user.idUsuario) {
        let listaOperaciones = [];
        let listaFestivales = [];
        let resultados = [];

        await fetch(link + `/operacion/usuario/${this.state.user.idUsuario}`)
          .then((response) => response.json())
          .then((data) => (listaOperaciones = data))
          .catch((error) => console.error(error));

        await fetch(link + `/festival`)
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
      console.log(ordenFecha);
      console.log("Antes: ");
      console.log(this.state.showMisComprasList);
      console.log(this.state.showMisComprasList[0].operacion.fechaCompra);
      console.log(
        Date.parse(this.state.showMisComprasList[0].operacion.fechaCompra)
      );
      if (ordenFecha != null) {
        if (ordenFecha == true) {
          this.state.showMisComprasList.sort((a, b) => {
            let dateA = a.operacion.fechaCompra.split("-");
            let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0]);
            let dateB = b.operacion.fechaCompra.split("-");
            let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0]);

            console.log(finalDateA);

            return finalDateB - finalDateA;
          });
        } else {
          this.state.showMisComprasList.sort((a, b) => {
            let dateA = a.operacion.fechaCompra.split("-");
            let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0]);
            let dateB = b.operacion.fechaCompra.split("-");
            let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0]);

            return finalDateA - finalDateB;
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
    async editFestivalCompra(context, datos) {
      context.commit("setLoading", true);
      console.log('datos', datos);
      fetch(link + "/festival/" + datos.idFestival, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
      })
        .then((response) => {
          if (response.ok) {
            context.dispatch("cargarFestivales");
          } else {
            console.error("No se ha podido editar el festival");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    },
    async deleteFestivalCompra(context, idFestival) {
      context.commit("setLoading", true);
      fetch(link + "/festival/" + idFestival, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            context.dispatch("cargarFestivales");
            context.commit("setMensajeDelete", true);
          } else {
            console.error("No se pudo eliminar el evento");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    },
    async comprarFestival({ commit }, ticket) {
      console.log(this.state.idFestival);
      console.log(this.state.user.idUsuario);
      console.log(ticket);
      console.log(this.state.festivalCompra.precioEntrada * ticket);

      // POST operacion
      await fetch(link + "/operacion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idOperacion: 0,
          idFestival: this.state.idFestival,
          idUsuario: this.state.user.idUsuario,
          numEntradasCompradas: ticket,
          precioTotal: this.state.festivalCompra.precioEntrada * ticket,
        }),
      });

      // PUT festival
      await fetch(link + `/festival/${this.state.festivalCompra.idFestival}`, {
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
          stock: this.state.festivalCompra.stock - ticket,
          mes: this.state.festivalCompra.mes,
        }),
      });

      commit("setDatoInutil", null);
    },
    async fetchFestival({ commit, dispatch }) {
      let idFestivalCookie = await dispatch("getCookie", "idFestivalCompra");
      if (idFestivalCookie) {
        commit("setIdFestival", idFestivalCookie);
      }
      await fetch(link + `/festival/${this.state.idFestival}`)
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
          miCookieValue = cookie.substring(
            `${stringCookie}=`.length,
            cookie.length
          );
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
      let rol = await dispatch("getCookie", "userRol");

      if (idUsuario && nombre && apellido && email && password) {
        commit("setUser", {
          idUsuario: idUsuario,
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
          rol: rol,
        });
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
