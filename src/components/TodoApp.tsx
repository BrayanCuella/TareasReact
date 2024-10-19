import { useState } from "react"
import { ListaTareas } from "./ListaTareas"

export const TodoApp = () => {
    const [getnuevaTarea, setNuevaTarea] = useState<string>('')
    const [getListaTareas, setListaTareas] = useState<string[]>([])

    const handleAddTask = () =>{
        if(getnuevaTarea.trim()==='')return
        setListaTareas(tareasAnteriores=>[...tareasAnteriores,getnuevaTarea])
        setNuevaTarea('')
    }
    const handleBorrarTarea =(index:number)=>{
        setListaTareas(tareas=>tareas.filter((_,i)=>i!==index))
    }
    return (
        <div>
            <h1>lista de tareas</h1>
            <div>
                <input
                    type="text"
                    value={getnuevaTarea }
                    onChange={(e)=> setNuevaTarea(e.target.value) }
                    placeholder="Nueva tarea"

                />
                <button onClick={handleAddTask}>Agregar Tareas </button>
            </div>
            <ListaTareas listaTareas={getListaTareas}borrarTarea={handleBorrarTarea}></ListaTareas>
        </div>
    )
}