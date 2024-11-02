import { IProducto, Producto } from "../../interfaces/Producto";
import { useDispatch, useSelector } from "react-redux";
import { ProductoState, setData, setProductos } from "../../features/producto/productoSlice";
import { ProductoService } from "../../services/producto.service";
import Swal from "sweetalert2";
import { useState } from "react";



export const Form = () => {
    const { producto } = useSelector((state: { producto: ProductoState }) => state);

    const [errorForm, setErrorForm] = useState({
        nombre: false,
        cantidad: false,
        precio: false
    })

    const dispatch = useDispatch();

    const productoService = new ProductoService();

    const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setData({ ...producto.data, [event.target.id]: event.target.value }));
    };

    const isValidForm = () => {
        const error = {
            nombre: false,
            cantidad: false,
            precio: false
        }

        if (!producto.data.nombre) error.nombre = true
        if (!producto.data.cantidad) error.cantidad = true
        if (!producto.data.precio) error.precio = true

        setErrorForm(error)

        return error.nombre || error.cantidad || error.precio
    }

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
            // Validar que el formulario este lleno
            if (isValidForm()) return null;

            const data: IProducto = await productoService.post(producto.data);
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

    const inputCSS = " form-control "
    const inputError = " is-invalid "

    return (
        <div className="col-6">
            <form onSubmit={(e) => producto.data.id ? fetchUpdate(e) : fetchCreate(e)}>
                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Artyom Developer"
                        value={producto.data.nombre}
                        onChange={(e) => setFormValue(e)}
                        className={errorForm.nombre ? inputCSS + inputError : inputCSS}
                    />
                    {errorForm.nombre && <div className="invalid-feedback">Este campo es requerido</div>}
                </div>

                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Cantidad</label>
                    <input
                        id="cantidad"
                        type="text"
                        placeholder="California cll 100"
                        value={producto.data.cantidad === 0 ? '' : producto.data.cantidad}
                        onChange={(e) => setFormValue(e)}
                        className={errorForm.cantidad ? inputCSS + inputError : inputCSS}
                    />
                    {errorForm.cantidad && <div className="invalid-feedback">Este campo es requerido</div>}

                </div>

                <div className="mt-4">
                    <label className="mb-2 text-gray-800">Precio</label>
                    <input
                        id="precio"
                        type="text"
                        placeholder="8888888"
                        value={producto.data.precio === 0 ? '' : producto.data.precio}
                        onChange={(e) => setFormValue(e)}
                        className={errorForm.precio ? inputCSS + inputError : inputCSS}
                    />
                    {errorForm.precio && <div className="invalid-feedback">Este campo es requerido</div>}
                </div>
                <button className="mt-4">
                    {producto.data.id ? "Actualizar" : "Crear"}
                </button>
            </form>
        </div>
    );
};
