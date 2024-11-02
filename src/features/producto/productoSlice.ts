import {createSlice,PayloadAction}from "@reduxjs/toolkit"//slyes ayuda a reocger la informacion
import { IProducto,Producto } from "../../interfaces/Producto"

export interface ProductoState{
    data:IProducto;
    list:IProducto[];
}

const initialState:ProductoState={
    data:new Producto(),
    list:[]
}

export const productoSilece=createSlice({
    name:'producto',
    initialState,
    reducers:{
        setData:(state,action:PayloadAction<IProducto>) =>{
            state.data=action.payload
        },
        setProductos:(state,action:PayloadAction<IProducto[]>) =>{
            state.list=action.payload
        },
    }

})
export const{setData,setProductos}=productoSilece.actions
export default productoSilece.reducer