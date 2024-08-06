import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
    <Header/>
    <Outlet/> 

    {/* only the outlet place is chnaging rest not  */}
    <Footer/>
    </>
  )
}

export default Layout



// We can also done all these work in app.jsx

// in classic method ,we call header and footer in every components such as Home ,AboutUs etc.