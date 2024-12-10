import React from 'react'
import { Outlet } from 'react-router-dom'
import Sideber from '../conponents/admin/Sideber'
import Headerbar from '../conponents/admin/Headerbar'

const LayoutAdmin = () => {
  return (
    <div className='flex h-screen'>
      <Sideber />
      <div className='flex-1 flex flex-col'>
        <Headerbar />
        <main className='flex-1 p-6 bg-slate-300 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutAdmin