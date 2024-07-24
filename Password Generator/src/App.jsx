import { useState ,useCallback,useEffect, useRef} from 'react'
// import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)

  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState('')

  // useRef hook
  const passwordRef=useRef(null)

  // to shuffle the string we use this :

  function shuffleString(str) {
    // Convert the string to an array
    let arr = str.split('');
  
    // Shuffle the array using the **Fisher-Yates algorithm **
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    // Convert the shuffled array back to a string
    return arr.join('');
  }

  const passwordGenerator=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let len=length;
    if (numAllowed){ 
      // str += "0123456789"
      let numStr="0123456789"
      let numLen=Math.floor(Math.random()*(length/3)+1)
      // console.log("numLen is " ,numLen)
      for(let i=1;i<=numLen;i++){
        let ind=Math.floor(Math.random()*numStr.length)
        pass+=numStr.charAt(ind)
        //  setPassword(pass)
      }
      len=len-numLen
      // console.log("len is ",len)
    }
    if (charAllowed){ 
      let charStr = "!@#$%^&*-_+=~"
      let charLen=Math.floor(Math.random()*(length/3)+1)
      // console.log('charLen is ',charLen)
      for(let i=1;i<=charLen;i++){
        let ind=Math.floor(Math.random()*charStr.length)
        pass+=charStr.charAt(ind)
        //  setPassword(pass)
      }
      len=len-charLen
      // console.log('len is ',len)

    }
    // console.log("final len is ",len)

    for(let i=1;i<=len;i++){
      let ind=Math.floor(Math.random()*str.length)
      pass+=str.charAt(ind)
      //  setPassword(pass)
       
    }
    // setPassword((prev)=>shuffleString(prev))
    setPassword(shuffleString(pass))

    //here problem is that there is order in password that first digits then characters and then other values so we have to shuffle this


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
      value={password}// when page relaod first empty value then as useEffect already call (at reloads) then there some password value generate which is shown (this very fast that we don't see empty )
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button  
      onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600'>
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
      <div>
        <button className=' bg-red-500 text-white hover:bg-red-400' onClick={passwordGenerator}  style={{width:'50px' ,borderRadius:'5px' , marginLeft:'10px'}}>New</button>
      </div>
    </div>

   </div>
  )
}

export default App
