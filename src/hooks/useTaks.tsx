import { TaskStatus } from "../interfaces";
import { useState } from "react";
import Swal from "sweetalert2"
import { useTaskStore } from "../stores"


interface Opctions{
    status: TaskStatus;
}


export const useTasks = ({ status }: Opctions ) => {
    
    const isDragging = useTaskStore(state => !!state.draggingTaskId)
    const [onDrag, setOnDrag] = useState(false)
    
    const onTaskDrop = useTaskStore(state => state.onTaskDrop)
    
    const draggingTaskId = useTaskStore(state => state.draggingTaskId)
    
    const addNewTask = useTaskStore(state => state.addTask)
    
    
    // const changeStatus = useTaskStore(state => state.changeStatus)
    
    
    const handleDragOver = ( event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setOnDrag(true)
     
    }
  
    const handleDrop = ( event: React.DragEvent<HTMLDivElement> ) => {
      event.preventDefault();
      setOnDrag(false)
      onTaskDrop(status)
    }
  
    const handleDragLeave = ( event: React.DragEvent<HTMLDivElement> ) => {
      event.preventDefault();
      setOnDrag(false)
    }
  
    const handleAddTask = async() => {
  
      const { isConfirmed, value } = await Swal.fire({
        title: 'Add task',
        input: 'text',
        inputLabel: 'Name of the task',
        inputPlaceholder: 'Enter task name',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: 'Add',
        
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })
      
      if (!isConfirmed) return
    
      addNewTask(value, status)
    }


   return{
    isDragging,

    onDrag,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleAddTask
   } 
}