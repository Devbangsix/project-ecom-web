import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../conponents/MainNav'

const LayoutUser = () => {
  return (
   <div>
        <MainNav />
        
        
        <main>
          <Outlet />
        </main>
    </div>
  )
}

export default LayoutUser