import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(15)  // We can also change the setCounter name and counter name to other value 
  // Every place where counter is present ,the changes reflect

 function addValue(){
   // setCounter(counter+1)
   if(counter<20){
    counter=counter+1
    setCounter(counter)
   }
   
 }

 function subValue(){
  // setCounter(counter-1)
  if(counter>0){
   counter=counter-1
   setCounter(counter)
  }
  
}
  return (
    <>
      <div>Counter value : {counter}</div>
      <br />
      <button onClick={addValue}>Up</button>
      <button onClick={subValue}>Down</button>
    </>
  )
}

export default App
