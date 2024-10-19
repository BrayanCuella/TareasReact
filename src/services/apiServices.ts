import axios from "axios";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

//se coloca el BASE URL -> url base del backend
//RECUERDA CAMBIAR EL URL
const API_URL = 'http://localhost/laravel-api/public/api'


//Funcion asignada para hacer la solicitud
export const getData = async():Promise<Producto[]>=>{
    try {
        const response = await axios.get<Producto[]>(`${API_URL}/productos`);
        return response.data;
    }catch(error){
        console.error('Error al obtener la data',error);
        throw error;//seguro para el ,manejo de excepciones
    }
}