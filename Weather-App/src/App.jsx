import { useState,useEffect } from 'react'
import useWeatherInfo from './useWeatherInfo'
import './App.css'
import axios from 'axios';


function App() {

   const [keyword, setKeyword] = useState("")
  const [city,setCity]=useState('')
  const [temp,setTemp]=useState('')
  const[weatherImage,setWeatherImage]=useState('')
  const[humidity,setHumidity]=useState('')
  const[windSpeed,setWindSpeed]=useState('')


useEffect(()=>{
  const fetchLocation=async()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( // ask user about location access permission
      async (position)=>{
        
        const{latitude,longitude}=position.coords;
        // console.log(latitude)
        // console.log(longitude)
        console.log(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cd526572923e4c68a00104241be92c43`)

      

    
    // reverse geocoding
    try{
      const response=await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cd526572923e4c68a00104241be92c43`
      );
      // console.log(response)
      const  components  = response.data.results[0].components;
      // console.log('now reading components ',components)
      //console.log('it is false')
      console.log("current district is : ",components.state_district )
      setKeyword(components.state_district.toLowerCase())
      

    }
     catch{
      console.log('inside catch')
      setCity('bangalore')
      display()
     }
  }
  );
  }
  else{
    console.log("Geolocation is not supported by this browser")
    setCity('bangalore')
  }
}
fetchLocation();
},[]
)


const onCityChange=(city)=>{
    setKeyword(city)
    console.log("CITY IS : ",city)
}

  const weatherInfo=useWeatherInfo(city)

  function display(){
    setCity(keyword)
    console.log("Inside display")
    setTemp(Math.round(weatherInfo.main['temp']))
    setHumidity(weatherInfo.main['humidity'])
    setWindSpeed(Math.round(weatherInfo.wind['speed']*18/5))

    if((weatherInfo.weather[0]['main']).toLowerCase()=='clear')
      setWeatherImage('./images/clear.png')
    else if((weatherInfo.weather[0]['main']).toLowerCase()=='clouds')
      setWeatherImage('./images/clouds.png')
    else if((weatherInfo.weather[0]['main']).toLowerCase()=='drizzle')
      setWeatherImage('./images/drizzle.png')
    else if((weatherInfo.weather[0]['main']).toLowerCase()=='mist')
      setWeatherImage('./images/mist.png')
    else if((weatherInfo.weather[0]['main']).toLowerCase()=='rain')
      setWeatherImage('./images/rain.png')
    else if((weatherInfo.weather[0]['main']).toLowerCase()=='snow')
      setWeatherImage('./images/snow.png')
  }


  function handleClick(ev){
     if(ev.key=='Enter'){
            onCityChange && onCityChange(keyword)
           // display()   // final add
     }
}


  return (
    <div className="card"
    style={{width:'90%' ,maxWidth:'470px' , background:'linear-gradient(135deg , #00feba,#5b548a' , color:"#fff" , margin:'100px auto 0',borderRadius:'20px' , padding:'40px 35px' , textAlign:'center'}}
    >
       <div className="search"
       
       >
        <form 
        onSubmit={(e)=>{
          e.preventDefault()
          //display()
          //write function which trigger when submit button
       }}

       style={{width:'100%' ,display:'flex' ,alignItems:'center',
        justifyContent:'space-between'
       }}
        >
         
          
        <input type="text" placeholder='Enter city name ' onKeyDown={(ev)=>handleClick(ev)} spellCheck='false' value={keyword} 
        onChange={(e)=>{
         
         setKeyword(e.target.value)
         console.log("keyword is "  ,keyword)
         
            // onCityChange && onCityChange(e.target.value)
         // }
          }
          }


        style={{border:'0' ,outline:'0' ,background:'#ebfffc',color:'#555' ,padding:"10px 25px" ,height:'60px' ,borderRadius:'30px' ,flex:'1' , marginRight:'16px', fontSize:'18px'}}/>

        <button type='submit'
        style={{border:'0' ,outline:'0' ,background:'#ebfffc', borderRadius:'50%',
          width:'60px' , height:'60px',
          cursor:'pointer'
        }}
        ><img src="./images/search.png"  
        style={{width:'30px' , margin:'auto' }}
        /></button>
        </form>
       </div>

       <div className="weather">

        <img src={weatherImage}
        // {`./images/${weatherImage}.png` }
        alt=""
        style={{width:'170px' ,marginTop:'30px', margin:'auto'}}
        />
        <h1 
          style={{fontSize:'80px', fontWeight:'500'}}
        >{temp}°C</h1>
        <h2
        style={{fontSize:'45px', fontWeight:'400' , marginTop:'-10px'}}
        >{city}</h2>
        <div className="details"
        style={{display:'flex' ,alignItems:'center' ,justifyContent:'space-between' , padding:'0 20px' ,marginTop:'50px'}}
        >
          <div className="col"
          style={{display:'flex' , alignItems:'center' ,textAlign:'center'}}
          >
            <img src="./images/humidity.png" alt=""
            style={{width:'40px',marginRight:'10px'}}
            />
            <div>
              <p 
              style={{fontSize:'28px' , marginTop:'-6px'}}
              >{humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col"
           style={{display:'flex' , alignItems:'center' ,textAlign:'center'}}
          >
            <img src="./images/wind.png" alt="" 
            style={{width:'40px',marginRight:'10px'}}
            />
            <div>
              <p 
              style={{fontSize:'28px' , marginTop:'-6px'}}
              >{windSpeed} km/h</p>
              <p >Wind Speed</p>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default App
