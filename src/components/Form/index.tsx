import { IProducto, Producto } from "../../interfaces/Producto";
import { useDispatch, useSelector } from "react-redux";
import { ProductoState, setData, setProductos } from "../../features/producto/productoSlice";
import { ProductoService } from "../../services/producto.service";
import Swal from "sweetalert2";



export const Form = () => {
    const {producto} = useSelector((state: {producto:ProductoState}) => state);
    const dispatch = useDispatch();
    const productoService = new ProductoService();

    const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setData({ ...producto.data, [event.target.id]: event.target.value }));
    };

    const fetchUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data: IProducto = await productoService.put(producto.data);
            const dataArray: IProducto[] = [...producto.list];
            let index: number = dataArray.findIndex((item: IProducto) => item.id === data.id);
            dataArray.splice(index, 1, data);
            dispatch(setProductos(dataArray));
            dispatch(setData(new Producto())); // Limpia después de actualizar

            Swal.fire({
                icon: 'success',
                title: 'The data has been updated',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data:IProducto = await productoService.post(producto.data);
            dispatch(setData(new Producto())); // Limpia después de crear

            const dataArray: IProducto[] = [...producto.list];
            dataArray.push(data);
            dispatch(setProductos(dataArray));

            Swal.fire({
                icon: 'success',
                title: 'The data has been created',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
            <form onSubmit={(e) => producto.data.id ? fetchUpdate(e) : fetchCreate(e)}>
                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Name</label>
                    <input
                        id="Name"
                        type="text"
                        placeholder="Artyom Developer"
                        value={producto.data.nombre}
                        onChange={(e) => setFormValue(e)}
                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-"
                    />
                </div>

                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Address</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="California cll 100"
                        value={producto.data.cantidad}
                        onChange={(e) => setFormValue(e)}
                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-"
                    />
                </div>

                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="8888888"
                        value={producto.data.precio}
                        onChange={(e) => setFormValue(e)}
                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-"
                    />
                </div>
                <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
                    {producto.data.id ? "save" : "create"}
                </button>
            </form>
        </div>
    );
};
