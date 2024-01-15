import {  IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { Task } from "../interfaces";
import { useTaskStore } from "../stores/index";
import Swal from 'sweetalert2';



interface Props {
    task: Task;
}


export const SingleTask = ( { task }: Props ) => {  

    const setDraggingTaskId = useTaskStore( state => state.setDraggingTaskId );
    const removeDraggingTaskId = useTaskStore( state => state.removeDraggingTaskId );
 
    const deleteNote = useTaskStore(state => state.deleteTask)

    const NoteUpdate = useTaskStore(state => state.updateTask)
 
    const handleDelete = (task: Task) => {
      deleteNote(task.id)
    }
     
    const updateTask = (task: Task) => {
      Swal.fire({
        title: 'Update Task',
        html: `
          <input id="taskTitleInput" class="swal2-input" value="${task.title}" />
          <p>Are you sure you want to update this task?</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTitle = (document.getElementById('taskTitleInput') as HTMLInputElement).value;
          NoteUpdate({...task, title: updatedTitle})
        }
      });
    };
 
     return (
       <div
        draggable
        onDragStart={() => setDraggingTaskId( task.id )}
        onDragEnd={() => removeDraggingTaskId()}
        className="mt-5 flex items-center justify-between p-2">
         <div className="flex items-center justify-center gap-2">
           <p className="text-base font-bold text-navy-700">
             { task.title }
           </p>
         </div>

        <div className="flex items-center space-x-2">
          <span className="h-6 w-6 text-navy-700 cursor-pointer" onClick={() => handleDelete(task)}>
           <IoTrashOutline />
           </span>

          <span className="" onClick={() => updateTask(task)}>
           <IoPencilSharp />
          </span>
        </div>

       </div>
     );
   };