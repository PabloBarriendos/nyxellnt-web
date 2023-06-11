export default class Festival {
  constructor(idFestival, nombre, artistas, descripcion, localidad, fecha, precioEntrada, stock, precioEntradaVip, stockVip, mes, imagen) {
    this.idFestival = idFestival, 
    this.nombre = nombre, 
    this.artistas = artistas, 
    this.descripcion = descripcion, 
    this.localidad = localidad, 
    this.fecha = fecha, 
    this.precioEntrada = precioEntrada, 
    this.stock = stock, 
    this.precioEntradaVip = precioEntradaVip, 
    this.stockVip = stockVip, 
    this.mes = mes, 
    this.imagen = imagen
  }
}