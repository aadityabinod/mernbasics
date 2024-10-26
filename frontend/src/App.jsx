
import './App.css'
import Home from './Home'
import Create from './Create'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
 
const [todos, setTodos] =  useState([])
const [editingTodo, setEditingTodo] =  useState(null)

useEffect(() => {
  axios.get('http://localhost:3000/get')
      .then(response => {
          console.log("Data received:", response.data); // Debug
          if (response.data) {
              setTodos(response.data);
          } else {
              console.log('No data received from the server');
          }
      })
      .catch(error => console.log('Error fetching todos:', error));
}, []);



   const handleAdd = (newTodo)=>{
        setTodos(prevTodos =>[...prevTodos, newTodo])
   }

   const handleUpdate = (updateTodo) =>{
      setTodos(prevTodos=>
        prevTodos.map(todo=>(todo._id === updateTodo._id? updateTodo : todo))
      )
      setEditingTodo(null)
   }

   const handleEdit = (todo)=>{
    setEditingTodo(todo)
   }

   const handleDelete = (id)=>{
    axios.delete(`http://localhost:3000/delete/${id}`)
    .then(()=>{
      setTodos(prevTodos=> prevTodos.filter(todo=> todo._id !== id))
    })
    .catch(err=> console.log(err))
   }

  return (
    <>
       <Home/>
       <Create onAdd={handleAdd} onUpdate={handleUpdate} editingTodo={editingTodo}/>

       {todos.length === 0 ? (
    <h2>Nothing to show</h2>
) : (
    todos.map(todo => (
        <div key={todo._id}>
            {todo.task}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>
    ))
)}

    </>
  )
}

export default App
