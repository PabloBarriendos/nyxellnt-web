export default class OperacionEntradas {
    constructor(idOperacionEntradas, idFestival, idUsuario, numEntradasCompradas, numEntradasVipCompradas, precioTotalEntradas, fechaCompra) {
      this.idOperacionEntradas = idOperacionEntradas, 
      this.idFestival = idFestival, 
      this.idUsuario = idUsuario, 
      this.numEntradasCompradas = numEntradasCompradas, 
      this.numEntradasVipCompradas = numEntradasVipCompradas, 
      this.precioTotalEntradas = precioTotalEntradas, 
      this.fechaCompra = fechaCompra
    }
}
