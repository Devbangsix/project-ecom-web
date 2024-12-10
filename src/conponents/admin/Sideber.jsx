import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react';
import { Kanban , ChartBarStacked, FolderKanban, LogOut ,ListOrdered   } from 'lucide-react';
import uesEcomStore from '../../store/ecom-store';

const Sideber = () => {
  const logout = uesEcomStore((s) => s.logout)
  
  return (
    <div className='bg-slate-800 w-64 text-gray-100 flex flex-col h-screen'>
      
      <div className='h-24 bg-gray-600 flex items-center justify-center text-2xl font-bold'>
        admin panel
      </div>

      <div className='flex-1 px-4 py-4 space-y-2'>
        
        <NavLink to={'/admin'} className={({isActive})=>
          isActive ? 'bg-slate-900 font-white px-4 py-2 hover:bg-slate-800 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <LayoutDashboard className='mr-2' />
          Dashboard
        </NavLink>
        
        <NavLink to={'cartegory'} className={({isActive})=>
          isActive ? 'bg-slate-900 font-white px-4 py-2 hover:bg-slate-800 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <ChartBarStacked className='mr-2' />
          Cartegory
        </NavLink>

        <NavLink to={'product'} className={({isActive})=>
          isActive ? 'bg-slate-900 font-white px-4 py-2 hover:bg-slate-800 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <FolderKanban className='mr-2' />
          Product
        </NavLink>


        <NavLink to={'manage'} className={({isActive})=>
          isActive ? 'bg-slate-900 font-white px-4 py-2 hover:bg-slate-800 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <Kanban  className='mr-2' />
          Manage
        </NavLink>

        <NavLink to={'order'} className={({isActive})=>
          isActive ? 'bg-slate-900 font-white px-4 py-2 hover:bg-slate-800 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <ListOrdered   className='mr-2' />
          Orders
        </NavLink>

      </div>

       <div  className='flex flex-col px-4 py-4 '>
        <NavLink className={({isActive})=>
          isActive ? ' bg-red-600 font-white px-4 py-2 hover:bg-red-500 flex items-center':
         'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
        <LogOut onClick={() => logout()} className='mr-2' />
          Logout
        </NavLink>
       </div>
    </div>
  )
}

export default Sideber