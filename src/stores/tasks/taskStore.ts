import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StateCreator, create } from "zustand";
import { Task,TaskStatus } from "../../interfaces";
import { v4  as uuidv4} from "uuid";

interface TaskState {

    draggingTaskId?: string;
    tasks: Record<string, Task>, 

    getTasksByStatus: ( status: TaskStatus ) => Task[],

    setDraggingTaskId: ( id: string ) => void
    removeDraggingTaskId: () => void
    changeStatus: ( id: string, status: TaskStatus ) => void
    onTaskDrop: ( status: TaskStatus ) => void

    addTask : ( title: string, status: TaskStatus) => void
    deleteTask: ( id: string ) => void
    
    updateTask: ( task: Task ) => void


}

const storeapi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]] > = ( set,get ) => ( {
    
    draggingTaskId: undefined,

    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
    },

    getTasksByStatus: ( status: TaskStatus ) => {
        return Object.values( get().tasks ).filter( task => task.status === status );
    },
    
    setDraggingTaskId: (taskId: string) => {
        set( {draggingTaskId: taskId })
    },

    removeDraggingTaskId: () => {
        set( {draggingTaskId: undefined})
    },

    changeStatus: ( id: string, status: TaskStatus ) => {        
        set( state => {
            state.tasks[id] = {
                ...state.tasks[id],
                status
            }
        })
    },

    onTaskDrop: ( status: TaskStatus ) => {
     const taskId = get().draggingTaskId;
     if(!taskId) return;

     get().changeStatus(taskId, status);
     get().removeDraggingTaskId();
    },

    addTask : ( title: string, status: TaskStatus) => {
        const newTaskId = {
            id: uuidv4(),
            title,
            status
        }

        set( state => {
            state.tasks[newTaskId.id] = newTaskId
        })  

    },

    deleteTask: ( id: string ) => {
        set( state => {
            delete state.tasks[id]
        })
    },

    updateTask: ( task: Task ) => {
        set( state => {
            state.tasks[task.id] = task
        })
    }
})


export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeapi),
            {name: 'task-store'}
        )      
    )
);