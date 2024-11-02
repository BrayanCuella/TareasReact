import { configureStore} from "@reduxjs/toolkit";//capa de seguridad que le pone a la aplicacion el middeseelalrew
import productoReducer from '../features/producto/productoSlice'

export default configureStore({
    reducer:{
        producto:productoReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false, // Desactiva la verificación de serializabilidad si tienes valores no serializables
    })
})