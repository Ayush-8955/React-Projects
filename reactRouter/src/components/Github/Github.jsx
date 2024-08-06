import React, { useEffect,useState } from 'react'
import { useLoaderData } from 'react-router-dom'
function Github() {
  //  const [data,setData]=useState([])
    // we want to call api when this function load so that it give data from github account -> so use useEffect hook
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/ayush-8955').then(res=>res.json())
    //     .then(data =>{
    //         console.log(data)
    //         setData(data)
    //     })
    // },[])

    const data =useLoaderData()
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers :{data.followers}
    <img src="{data.avatar_url}" alt="Git Picture" width={300} />
    Github Profile Name : {data.name}
    </div>
    
  )
}

export default Github


// This below part should be made in new file (as it is not good practice to write below)

export const githubInfoLoader=async()=>{
  const response = await fetch('https://api.github.com/users/ayush-8955')
    return  await response.json() ;
}
/*The fetch function is asynchronous, so you need to use await to wait for the response.
Once you have the response, you call response.json() to parse the JSON data.*/


// concept : we we slight hover on Github on page , the fetching start automatically so that when we click on it the data shown directly(optimised) without taking any time lag of fetching data