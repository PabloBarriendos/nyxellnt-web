import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var link = "https://festivalia-api-1.azurewebsites.net/";
// https://nyxellnt-api-2.azurewebsites.net/
// http://localhost:80

export default new Vuex.Store({
  state: {
    // datos INUTILES
    datoInutil: null,
    idFestival: null,
    festivalCompra: {},
    counter: 1,
    userList: [],

    // global
    user: {},

    // página Home
    paginaHome: false,
    festivalList: [],
    showFestivalList: [],
    loading: false,
    mostrarMensajeDelete: false,

    // Header
    showLoginPopUp: false,
    userLogged: false,

    // Carrito
    errorCompra: false,

    // Mis compras
    misFestivalesList: [],
    showMisFestivalesList: [],
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
    setMisFestivalesList(state, list) {
      state.misFestivalesList = list;
    },
    setShowMisFestivalesList(state, list) {
      state.showMisFestivalesList = list;
    },
    setErrorCompra(state, errorCompra) {
      state.errorCompra = errorCompra;
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
      let resultados = this.state.misFestivalesList.filter((item) => {
        if (
          item.festival.nombre.toLowerCase().includes(search) ||
          item.festival.artistas.toLowerCase().includes(search)
        ) {
          return item;
        }
      });
      commit("setShowMisFestivalesList", resultados);
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
    async addFestival(context, festival) {

      await fetch(link + "/festival", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idFestival: 0,
          nombre: festival.nombre,
          artistas: festival.artistas,
          descripcion: festival.descripcion,
          localidad: festival.localidad,
          fecha: festival.fecha,
          precioEntrada: parseInt(festival.precioEntrada),
          stock: parseInt(festival.stock),
          precioEntradaVip: parseInt(festival.precioEntradaVip),
          stockVip: parseInt(festival.stockVip),
          mes: festival.mes,
          imagen: festival.imagen
        }),
      });

      context.commit('setDatoInutil', true);
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
    
    async requestFiltroOperaciones({ commit }, datos) {
      commit("setLoading", true);
      let stringBuscar = datos.stringBuscar;
      let ordenPrecio = datos.ordenPrecio;
      let ordenFecha = datos.ordenFecha;

      let operaciones = []
      let listaFestivales = [];

      let resultados = [];

      if (ordenPrecio != null && ordenFecha == null) {
        await fetch(link + `/operacionEntradas/usuario/${this.state.user.idUsuario}?ordenarPrecio=${ordenPrecio}`)
          .then((response) => response.json())
          .then((data) => {
            operaciones = data;
            // commit("setShowMisFestivalesList", data);
          })
          .catch((error) => console.error(error));
      }
      if (ordenPrecio == null && ordenFecha != null) {
        await fetch(link + `/operacionEntradas/usuario/${this.state.user.idUsuario}?ordenarFecha=${ordenFecha}`)
          .then((response) => response.json())
          .then((data) => {
            operaciones = data;
            // commit("setShowMisFestivalesList", data);
          })
          .catch((error) => console.error(error));
      }
      if (ordenPrecio != null && ordenFecha != null) {
        await fetch(link + `/operacionEntradas/usuario/${this.state.user.idUsuario}?ordenarPrecio=${ordenPrecio}&ordenarFecha=${ordenFecha}`)
          .then((response) => response.json())
          .then((data) => {
            operaciones = data;
            commit("setShowMisFestivalesList", data);
          })
          .catch((error) => console.error(error));
      }


      await fetch(link + `/festival`)
          .then((response) => response.json())
          .then((data) => (listaFestivales = data))
          .catch((error) => console.error(error));


      console.log('RESULTADOS', resultados);

      operaciones.forEach((operacion) => {
        listaFestivales.forEach((festival) => {
          if (operacion.idFestival == festival.idFestival) {
            resultados.push({ operacion, festival });
          }
        });
      });

      console.log('RESULTADOS 2', resultados);

      resultados = resultados.filter((item) => {
        if (
          item.festival.nombre.toLowerCase().includes(stringBuscar)
        ) {
          return item;
        }
      });

      console.log('RESULTADOS 2', resultados);
      commit("setShowMisFestivalesList", resultados);
      // commit("setLoading", false);
    },
    async getOperacionesUsuario(context) {
      await context.dispatch("cargarCookiesUsuario");

      if (this.state.user.idUsuario) {
        let operacionesFestivales = [];
        let listaFestivales = [];
        let resultados = [];

        await fetch(link + `/operacionEntradas/usuario/${this.state.user.idUsuario}`)
          .then((response) => response.json())
          .then((data) => (operacionesFestivales = data))
          .catch((error) => console.error(error));

        await fetch(link + `/festival`)
          .then((response) => response.json())
          .then((data) => (listaFestivales = data))
          .catch((error) => console.error(error));

        operacionesFestivales.forEach((operacion) => {
          listaFestivales.forEach((festival) => {
            if (operacion.idFestival == festival.idFestival) {
              resultados.push({ operacion, festival });
            }
          });
        });

        context.commit("setMisFestivalesList", resultados);
        context.commit("setShowMisFestivalesList", resultados);
      }
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

        commit("setMisFestivalesList", resultados);
        commit("setShowMisFestivalesList", resultados);
      }
    },
    // async requestFiltroOperaciones({ commit }, ordenFecha) {
    //   console.log(ordenFecha);
    //   console.log("Antes: ");
    //   console.log(this.state.showMisFestivalesList);
    //   console.log(this.state.showMisFestivalesList[0].operacion.fechaCompra);
    //   console.log(
    //     Date.parse(this.state.showMisFestivalesList[0].operacion.fechaCompra)
    //   );
    //   if (ordenFecha != null) {
    //     if (ordenFecha == true) {
    //       this.state.showMisFestivalesList.sort((a, b) => {
    //         let dateA = a.operacion.fechaCompra.split("-");
    //         let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0]);
    //         let dateB = b.operacion.fechaCompra.split("-");
    //         let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0]);

    //         console.log(finalDateA);

    //         return finalDateB - finalDateA;
    //       });
    //     } else {
    //       this.state.showMisFestivalesList.sort((a, b) => {
    //         let dateA = a.operacion.fechaCompra.split("-");
    //         let finalDateA = new Date(dateA[2], dateA[1] - 1, dateA[0]);
    //         let dateB = b.operacion.fechaCompra.split("-");
    //         let finalDateB = new Date(dateB[2], dateB[1] - 1, dateB[0]);

    //         return finalDateA - finalDateB;
    //       });
    //     }

    //     console.log("Despues: ");
    //     console.log(this.state.showMisFestivalesList);

    //     commit("setDatoInutil", null);
    //   }
    // },
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
    async comprarFestival(context, datos) {
      const festival = datos.festival;
      const entradas = datos.entradas;
      const entradasVip = datos.entradasVip;

      let now = new Date();
      let day = now.getDate();
      let month = now.getMonth() + 1;
      let year = now.getFullYear();
      let fechaActual = ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;

      console.log('fecha', fechaActual);
      console.log('festival', festival);
      console.log('entradas', entradas);
      console.log('entradasVip', entradasVip);

      const precioTotal = (entradas * festival.precioEntrada) + (entradasVip * festival.precioEntradaVip);
      console.log('precioTotal', precioTotal);

      // POST operacion
      await fetch(link + "/operacionEntradas", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({

          idOperacionEntradas: 0,
          idFestival: festival.idFestival,
          idUsuario: this.state.user.idUsuario,
          numEntradasCompradas: entradas,
          numEntradasVipCompradas: entradasVip,
          precioTotalEntradas: precioTotal,
          fechaCompra: fechaActual
        }),
      }).then((response) => {
        if (response.ok) {
          console.log("Compra realizada correctamente");
          context.commit("setErrorCompra", false);
        } else {
          console.error("No se pudo realizar la compra");
          context.commit("setErrorCompra", true);
        }
      })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          context.commit("setErrorCompra", true);
        });

      // PUT festival
      await fetch(link + `/festival/${this.state.festivalCompra.idFestival}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({

          idFestival: festival.idFestival,
          nombre: festival.nombre,
          artistas: festival.artistas,
          descripcion: festival.descripcion,
          localidad: festival.localidad,
          fecha: festival.fecha,
          precioEntrada: festival.precioEntrada,
          stock: festival.stock - entradas,
          precioEntradaVip: festival.precioEntradaVip,
          stockVip: festival.stockVip - entradasVip,
          mes: festival.mes,
          imagen: festival.imagen
        }),
      });

      context.commit("setDatoInutil", null);
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
