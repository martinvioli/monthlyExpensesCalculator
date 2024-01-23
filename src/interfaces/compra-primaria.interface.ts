export default interface ICompraPrimaria {
  id: number;
  fecha: string;
  comercio: string;
  precioNeto: number;
  importeRestar: number;
  comprador: "Martin" | "Natalia";
  cantidadProductos: number;
}