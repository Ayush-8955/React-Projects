import { useState ,useCallback,useEffect, useRef} from 'react'
// import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState('')

  // useRef hook
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) str += "0123456789"

    if (charAllowed) str += "!@#$%^&*-_+=~"

    for(let i=0;i<=length;i++){
      let ind=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(ind)
      setPassword(pass)
    }
  },[length,numAllowed,charAllowed,setPassword]) // array ->values pass such that -> optimization,memonization

  const copyPasswordToClipboard=useCallback(()=>{
    // window.navigator.clipboard.writeText(password)  -> direct kam ho sakta h , but as copied effect (password select ) we use following 
    passwordRef.current?.select();// optionally
    passwordRef.current?.setSelectionRange(0, 100);// optimized
    window.navigator.clipboard.writeText(password);
  },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator])
// also call when page reload as all array values are initialised with their default value -> change so it call

//array->values ->when we want to call passwordGenerator function



  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'
   >
    <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button  
      onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
        Copy
      </button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={40}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>

      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {
              setNumAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>

   </div>
  )
}

export default App
