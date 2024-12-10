import React, { useState, useEffect } from 'react'
import { getListAllUsers,
    changeUserStatus,
    changeUserRole
 } from '../../api/admin'
import uesEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUsers = () => {
    const token = uesEcomStore((state) => state.token)
    const [users, setUsers] = useState([])
    useEffect(() => {
        handleGetUsers(token)
    }, [])
    const handleGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }
    const handleChangeUserStatus = (userId,userStatus) => {
        console.log(userId,userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token,value)
        .then((res)=>{
            console.log(res)
            handleGetUsers(token)
            toast.success('Update Status Succeess')
        })
        .catch(err => console.log(err))
    }
    const handleChangeUserRole = (userId,userRole) => {
        console.log(userId,userRole)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token,value)
        .then((res)=>{
            console.log(res)
            handleGetUsers(token)
            toast.success(`Update Role Succeess`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='container mx-auto p-4 bg-slate-800 text-white '>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>role</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>
                                    <select
                                    onChange={(i)=>handleChangeUserRole(item.id,i.target.value)}
                                     value={item.role} className='text-black'>
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>
                                <td>
                                    {item.enabled ? 'Active' : 'Inactive'}
                                </td>
                                <td>
                                    <button 
                                    className='bg-yellow-400 p-1 rounded-full'
                                    onClick={()=>handleChangeUserStatus(item.id,item.enabled)}>
                                        {item.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableUsers