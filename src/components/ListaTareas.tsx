import {Tarea} from "./Tarea"
type ListaTareas = {
    listaTareas:string[]
    borrarTarea:(index:number)=>void
}

export const ListaTareas = ({listaTareas,borrarTarea}: ListaTareas) => {
  return (
    <div className="taskList">
        {listaTareas.map((task,index)=>(
            <Tarea key={index} task={task} borrarTarea={()=>borrarTarea(index)}></Tarea>
        )
        )}
    </div>
  )
}