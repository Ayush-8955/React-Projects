import { useState } from 'react'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profie from './components/Profie'
import './App.css'
 
function App() {


  return (
    <UserContextProvider>
     <h1>Hello an welcome to Chai and Code</h1>
    <Login/>
    <Profie/>
    </UserContextProvider>
  )
}

export default App
