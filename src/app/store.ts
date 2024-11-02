import { configureStore} from "@reduxjs/toolkit";//capa de seguridad que le pone a la aplicacion el middeseelalrew
import productoReducer from '../features/producto/productoSlice'


export default configureStore({
    reducer:{
        Producto:productoReducer
    },

})