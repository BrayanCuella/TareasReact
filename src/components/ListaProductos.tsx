//tsrafc para crear siempre

import { useEffect, useState } from "react";
/*import { getData } from "../services/apiServices";*/
import { Button, Table } from "react-bootstrap";
import { ProductoService } from "../services/producto.service";


interface Producto  {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

export const ListaProductos:React.FC=()=>{
//el useState es para modificarlo en tiempo real 
const[productos,setProductos]=useState<Producto[]>([])
const[loading, setLoading]=useState<boolean>(true)
const[error, setError]=useState<string|null>(null)
//el useEffect son funcionaleidades que traemos de otras clases sin necesidad de tenerlas en estas clases
//los hook son funciones que dentro de la clase en la que estamos no necesitamos 
const productoService =new ProductoService();
useEffect(()=>{
    const fetchData= async ()=>{
        try {
            const result=await productoService.getData();
            setProductos(result);
        } catch (error) {
            setError('Error al cargar los datos 😔');
        }finally{
            setLoading(false);
        }
    }
    fetchData();
},[]);
  if (loading)return<div>Cargando.....</div>
  if(error)return<div>{error}</div>;
  
  return (
    <div>
        <h1>Datos de los productos</h1>
        <Table bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
      {productos.map((producto,index)=>(
                <tr key={producto.id}>
                    <td>{index+1}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio}</td>
                    <td>
                     <Button variant="success">Editar</Button>
                    <Button className="ms-2" variant="danger">Eliminar</Button>
                    </td>
                </tr>
                
            ))}
        
        
       
      </tbody>
    </Table>
    </div>
  )

//el map permite viajar entre las carpetas
}