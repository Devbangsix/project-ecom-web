import axios from 'axios';
import React,{useState} from 'react'
import { toast } from 'react-toastify';
import uesEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const Navigate = useNavigate()

  const actionLogin = uesEcomStore((state)=>state.actionLogin)
  const data = uesEcomStore((state) => state.user)
  console.log('user from zustand',data)

  const [form,setform] = useState({
    email:"",
    password:""
  })

  const handleOnChange = (i) => {
    console.log(i.target.name,i.target.value)
    setform({
      ...form,
      [i.target.name]:i.target.value
    })
  }
  const handleSubmit = async(i) => {
    i.preventDefault()
    try {
     const res = await actionLogin(form)
     const role = res.data.Payload.role
     console.log('role', role )
     roleRedirect(role)
     toast.success('Welcome')
    }catch(err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if(role === 'admin') {
      Navigate('/admin')
    } else {
      Navigate(-1)
    }
  }
  
  return (
    
    <div className='min-h-screen flex items-center justify-center bg-gray-300' >
      <div className='w-full shadow-md bg-white p-10  max-w-md'>
      <p className='text-2xl text-center my-4 font-bold'>LOGIN</p>
      <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <input className='rounded-full border w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        onChange={handleOnChange}
        placeholder='Email'    
        name='email'
        type='email'
        />
        <input className='rounded-full border w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        onChange={handleOnChange}
        placeholder='password'
        name='password'
        type='password'
        />
        <button className='bg-blue-500 rounded-full w-full text-white py-2 shadow-md hover:bg-blue-600' >
          Login
        </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login