// https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=c91716138080f9ccd4de5e5c56b9aa3b

// https://api.weatherapi.com/v1/current.json?key=b4deceb7697f409d845184826240308&q=${city}&aqi=no
import {useEffect,useState} from 'react'

// making custom hook

function useWeatherInfo(city){
    const [data , setData]=useState({})

useEffect(()=>{
   //const getCity= await () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=c91716138080f9ccd4de5e5c56b9aa3b`).then((res)=>res.json()).then((res)=>setData(res))
        console.log(data)
        console.log("inside useWeather info hook")}
  ,[city])
    return data
} 

export default useWeatherInfo