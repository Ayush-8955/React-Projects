import { useState,useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
const [todos,setTodos] =useState([])  // todos->array of many todo

const addTodo =(todo)=>{
  // here in todos array we want to add new todo but also remain the old todos so we first acces old todo and add our new todo with them in new array
  // want unique id to any number of times we here use Date.now() as it always a different value

  setTodos((prev)=>  [{id:Date.now(),...todo},...prev])
}

const updatedTodo=(id,todo)=>{
  setTodos((prev)=>prev.map((prevTodo)=> (prevTodo.id ===id ? todo :prevTodo)))
}

const deletedTodo = (id)=>{
  setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
}

const toggleComplete = (id) =>{
  setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo ,completed:!prevTodo.completed}: prevTodo))
}


// Local Storage 
// we want that when loads previously stored data are also shown 

useEffect(() => {
 
  const todos=JSON.parse(localStorage.getItem("todos"))

  if(todos && todos.length >0)
    setTodos(todos)

}, [])

useEffect(()=>{
  localStorage.setItem('todos',JSON.stringify(todos))
},[todos])





  return (
    <TodoProvider  value={{todos,addTodo,updatedTodo,deletedTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key ={todo.id} className='w-full'> 
                          <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
