export interface IProducto{
id:number;
nombre:string;
precio:number;
cantidad:number;
}
export class Producto implements IProducto{
  public id:number;
  public nombre:string;
  public precio:number;
  public cantidad:number;

    constructor(){
        this.id=0;
        this.nombre="";
        this.precio=0;
        this.cantidad=0;
    }
}