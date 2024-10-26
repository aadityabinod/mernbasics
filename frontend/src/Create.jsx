import React, { useState } from 'react'
import axios from "axios"

function Create({onAdd, onUpdate, editingTodo}) {
    const [task, setTask] = useState('')
                
    const handleAddorUpdate = ()=>{
       if(!task) return
       
       if(editingTodo){
        axios.put(`http://localhost:3000/update/${editingTodo._id}`, { task })
        .then(result=>{
            onUpdate(result.data);
            setTask('')

        })
        .catch(err=> console.log(err)
        )
      }
      else{
        axios.post('http://localhost:3000/add',{task})
        .then(result=>{
          onAdd(result.data);
          setTask('')
        })
        .catch(err=>console.log(err))
      }
    }

   
  return (
    <div>
        <input type="text" 
        placeholder='enter task'
        value={task}
        onChange={(e)=>setTask(e.target.value)}/>
        <input type="button" value={editingTodo ? "update": "add"} 
        onClick={handleAddorUpdate}
        />
        
        
    </div>


  )
}

export default Create