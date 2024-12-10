import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email!!' }),
  password: z.string().min(8, { message: 'Password must have more than 8 characters.' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password is not match', path: ["confirmPassword"]
});


const Register = () => {

  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)

  const [form, setform] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })

  const onSubmit = async (data) => {
    // const passwordScpre = zxcvbn(data.password).score
    // if (passwordScpre < 3) {
    //   toast.warning('Password is not secure !!!')
    //   return
    // }
    try {
      const res = await axios.post('https://project-ecom-api.vercel.app/Ping-eco/register', data)
      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300' >
      <div className='w-full shadow-md bg-white p-10  max-w-md'>
        <p className='text-2xl text-center my-4 font-bold'>REGISTER</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input className='border'
          onChange={handleOnChange}

          name='email'
          type='email'
        /> */}
          <div className='space-y-4'>
            <div>

              <input {...register('email')} placeholder='Email' className={`rounded-full border w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.email && 'border-red-500'}
                `} />
              {
                errors.email &&
                <p className='text-red-500'>
                  {errors.email.message}
                </p>
              }
            </div>
            
            <input {...register('password')} type='password' placeholder='Password' className={`rounded-full border w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${errors.password && 'border-red-500'}
                `} />
            {
              errors.password && (
              <p className='text-red-500'>
                {errors.password.message}
              </p>
            )}
            {
              watch().password?.length > 0 && <div className='flex mt-2'>
                {
                  Array.from(Array(5).keys()).map((item, index) => (
                    <span className='w-1/5 px-1' key={index}>
                      <div className={`h-3 rounded-md ${passwordScore <= 2 ? 'bg-red-500 ' : passwordScore < 4 ? ' bg-yellow-400' : 'bg-green-500'}`}>

                      </div>
                    </span>

                  ))
                }
              </div>

            }

            <input {...register('confirmPassword')} type='password' placeholder='Confirm Password' className={`rounded-full border w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.confirmPassword && 'border-red-500'}
                `} />
            {
              errors.confirmPassword &&
              <p className='text-red-500'>
                {errors.confirmPassword.message}
              </p>
            }
            <button className='bg-blue-500 rounded-full w-full text-white py-2 shadow-md hover:bg-blue-600' >
              register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register