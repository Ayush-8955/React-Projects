import {createContext,useContext} from "react"

export const TodoContext=createContext({
    // value
    todos:[{
        id:1,
        todo:'todo msg',
        completed :false
    },{},{}
    ],
    // function
    addTodo :()=>{},
    updatedTodo:(id,todo) =>{},
    deletedTodo:(id)=>{},
    toggleComplete:(id) =>{}

})

// custom hook
export const useTodo=()=>{
    return useContext(TodoContext)
}
export const TodoProvider=TodoContext.Provider