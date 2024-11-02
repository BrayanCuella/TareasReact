import { IProducto, Producto } from "../../interfaces/Producto";
import { useDispatch, useSelector } from "react-redux";
import { ProductoState, setData, setProductos } from "../../features/producto/productoSlice";
import { ProductoService } from "../../services/producto.service";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const table = () => {
    const { producto } = useSelector((state: {producto:ProductoState}) => state);
    
 
    const productoService = new ProductoService();

    const dispatch = useDispatch();

    const fetchData = async() => {
        try{
            const res:IProducto[]=await productoService.getAll()//ERRORRRRRRRRRRRRRRRRRR ES GET ALL

            dispatch(setProductos(res))
        }catch(error){
            console.log('error to failed load==>',error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
   
    const onClickDetele=(item:IProducto)=>{
        Swal.fire({
            title:'quieres guardar los cambios?',
            showCancelButton:true,
            confirmButtonText:'guardado'
        }).then((result)=>{
            if (result.isConfirmed){
                fetchDelete(item)
            }
        })
    }

    const fetchDelete = async (item:IProducto) => {
        try {
           await productoService.delete(item)
           Swal.fire({
            icon:'success',
            title:'el producto fue borrado',
            showConfirmButton:false
           })
           fetchData()
        } catch (error) {
            console.log('error al cargar =>',error);
        }
    }

    const onClickInfo= async (item:IProducto) => {
        try {
            const data: IProducto = await productoService.getById(item.id!);

            Swal.fire({
                icon: 'info',
                title: 'Details',
                html:
            `<b>nombre</b>: ${data.nombre} <br>`+ 
            `<b>precio</b>: ${data.precio} <br>`+ 
            `<b>cantidad</b>: ${data.cantidad} <br>`,
            showCloseButton:false,
            showCancelButton:false,
            confirmButtonText:'ok'
            })
            
        } catch (error) {
            console.log('error al cargar =>',error);
        }
    };

    return (
        <div className="inline-block">
            
            <button className="bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg" onClick={()=>dispatch(setData(new Producto()))}>
                new
            </button>

            <div className="overflow-hidden border border-gray-200 md:rounded-lg">

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-800">
                        <tr>

                            <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                Nombre
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-slate-50 font-medium text-left">
                                cantidad 
                            </th>
                            <th scope="col" className="px-4 py-3.5 text-slate-50 font-medium text-left">
                                precio 
                            </th>
                            <th scope="col" className="px-4 py-3.5 text-slate-50 font-medium text-left">
                                accion 
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            producto.list.map((item:IProducto,i)=>{
                                return(
                                    <tr key={i}>
                                        <td className="px-12 py-4 whitespace-nowrap">
                                            {item.nombre}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">{item.cantidad}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{item.precio}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">

                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" onClick={()=>onClickInfo(item)}>
                                                    info
                                                </button>
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" onClick={()=> dispatch(setData(item))}>
                                                    editar
                                                </button>
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" onClick={()=>onClickDetele(item)}>
                                                    eliminar
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
