import {api,headerAPI} from "../configs/axios";
import { IProducto } from "../interfaces/Producto";

export class ProductoService{
    private apiURL ="/productos";

    public async getAll(): Promise<IProducto[]> {
        try {
            console.log("consulta de productos");
            const response = await api.get<IProducto[]>(`${this.apiURL}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la data:  ', error);
            throw error; // seguro para el manejo de excepciones
        }
    }

    public async getData(){
        try {
            console.log("consulta de productos");
            const response = await api.get<IProducto[]>(`${this.apiURL}`);
            return response.data;
        }catch(error){
            console.error('Error al obtener la data:  ',error);
            throw error;//seguro para el ,manejo de excepciones
        }
    }
    public async getById(id:number){
        try {
            console.log(`consulta de productos${id}`);
            const response = await api.get<IProducto>(`${this.apiURL}/${id}`,headerAPI);
            const data:IProducto=response.data
            return data;
        }catch(error){
            console.error('Error al obtener la data:  ',error);
            throw error;//seguro para el ,manejo de excepciones
        }
    }
    public async post(data:IProducto){
        try{
            const response = await api.post<IProducto>(`${this.apiURL}`,data,headerAPI);
            return response.data
        } catch (error){
            console.log('Error al registrar producto: ',error)
            throw error;//seguro para el manejo de excepciones
        }
    }
    public async put(data:IProducto){
        try{
            const response=await api.put<IProducto>(`${this.apiURL}/${data.id}`,data,headerAPI);
            return response.data
        }catch (error){
            console.log('Error al registrar producto: ',error)
            throw error;//seguro para el manejo de excepciones
        }
    }
    public async delete(data:IProducto){
        try{
            const response=await api.delete(`${this.apiURL}/${data.id}`,headerAPI);
            return response.data
        }catch (error){
            console.log('Error al eliminar el producto: ',error)
            throw error;//seguro para el manejo de excepciones
        }
    }
}