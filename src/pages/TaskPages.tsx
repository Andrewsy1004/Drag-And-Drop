import {useTaskStore} from '../stores';
import {NoteTasks} from '../components/NoteTasks';

export const TaskPages = () => {
  
  const pending     =  useTaskStore( state => state.getTasksByStatus('open') );
  const inProgress  =  useTaskStore( state => state.getTasksByStatus('in-progress'));
  const doneTasks   =  useTaskStore( state => state.getTasksByStatus('done') );
   
  
  return (
    <>
    <h1 className="font-bold text-2xl mb-3">Drag and Drop</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mr-3 ml-3">          
        <NoteTasks title='Earrings' task={ pending } status='open' />
        <NoteTasks title='Going forward' task={ inProgress } status='in-progress' />
        <NoteTasks title='Finished' task={ doneTasks } status='done' />
     </div>

        
    </>
  )
  
}
