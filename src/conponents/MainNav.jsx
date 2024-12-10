import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import uesEcomStore from '../store/ecom-store'
import { ChevronDown } from 'lucide-react';

const MainNav = () => {
    const carts = uesEcomStore((state) => state.carts)
    const user = uesEcomStore((s) => s.user)
    const logout = uesEcomStore((s) => s.logout)
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='bg-red-600 p-2 right-4'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
                        <NavLink
                            className={({ isActive }) => isActive
                                ? 'bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium'

                            }
                            to={'/'}>Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive
                                ? 'bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium'

                            }
                            to={'/shop'}>Shop
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => isActive
                                ? 'bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium'

                            }
                            to={'/cart'}>
                            Cart
                            {

                                carts.length > 0 && (<span className='absolute top-0 bg-slate-700 text-white rounded-full px-2'>{carts.length}</span>)
                            }
                        </NavLink>
                    </div>

                    {
                        user
                            ? <div className='flex items-center gap-4'>
                                <button
                                    onClick={toggleDropdown}
                                    className='flex items-center gap-2'>
                                    <img
                                        className='w-8 h-8'
                                        src='https://cdn-icons-png.flaticon.com/128/847/847969.png' />
                                    <ChevronDown />
                                </button>
                                {
                                    isOpen && (
                                        <div className='absolute top-20 bg-slate-800 text-white z-50'>
                                            <Link
                                                to={"/user/history"}
                                                className='block px-2 py-2 '>
                                                History
                                            </Link>
                                            <button
                                                onClick={() => logout()}
                                                className='block px-2 py-2 '>
                                                LogOut
                                            </button>
                                        </div>
                                    )}
                            </div>
                            : <div className='flex items-center gap-4'>
                            <NavLink
                                className={({ isActive }) => isActive
                                    ? 'bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium'
    
                                }
                                to={'/register'}>Register
                            </NavLink>
                            <NavLink
                                className={({ isActive }) => isActive
                                    ? 'bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium'
                                    : 'hover:bg-slate-400 px-3 py-2 rounded-md text-sm font-medium'
    
                                }
                                to={'/login'}>Login
                            </NavLink>
                        </div>
                    }
                           
                </div>
            </div>
        </div>
    )
}

export default MainNav