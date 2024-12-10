import React from 'react'
import { ListCheck } from 'lucide-react';
import uesEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import {toast} from 'react-toastify'
import { numberFormat } from '../../utils/number'


const ListCart = () => {
  const cart = uesEcomStore((state) => state.carts)
  const user = uesEcomStore((s) => s.user)
  const token = uesEcomStore((s) => s.token)
  const getTotalPrice = uesEcomStore((state) => state.getTotalPrice)

  const navigate = useNavigate()

  const handleSaveCart = async() => {
    await createUserCart(token,{cart})
    .then((res) => {
      toast.success('Add order')
      // console.log(res)
      navigate('/checkout')
    })
    .catch((err) => {
      console.log('err',err)
      toast.warning(err.response.data.message)
    })
  }

  return (
    <div className='bg-gray-300 rounded-sm p-4'>
      {/* header */}
      <div className='flex gap-4'>
        <ListCheck />
        <p className='text-2xl font-bold'>List Product {cart.length} list</p>
      </div>
      {/* list */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* left */}
        <div className='col-span-2'>
          {
            cart.map((item, index) =>

              <div key={index}
                className='bg-slate-300 p-2 rounded-md shadow-md mb-2'>
                <div className='flex justify-between mb-2'>
                  <div className='flex gap-2 items-center'>
                    {
                      item.images && item.images.length > 0
                        ? <img
                          className='w-16 h-16 bg-gray-100 flex text-center items-center'
                          src={item.images[0].url} />
                        : <div className='w-16 h-16 bg-gray-100 flex text-center items-center' >
                          No Image
                        </div>
                    }
                    <div >
                      <p className='font-bold'>{item.title}</p>
                      <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>

                    </div>
                  </div>
                  <div>
                    <div className='font-bole text-blue-500'>
                      {numberFormat(item.price * item.count)}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        {/* right */}
        <div className='bg-slate-300 p-4 rounded-md shadow-md space-y-4'>
          <p className='text-2xl font-bold'>Total</p>
          <div className='flex justify-between'>
            <span>Net total</span>
            <span>฿{numberFormat(getTotalPrice())}</span>
          </div>
          <div className='flex flex-col gap-2'>
            {
              user 
              ? <Link to={''}>
                  <button
                  disabled={cart.length < 1 }
                  onClick={handleSaveCart} className='bg-blue-600 hover:bg-blue-800 py-2 shadow-md text-white w-full rounded-md'>Confirm</button>
                </Link>
              : <Link to={'/Login'}>
                  <button className='bg-green-600 hover:bg-green-800 py-2 shadow-md text-white w-full rounded-md'>Login</button>
                </Link>
            }
            
            
            <Link to={'/shop'}>
              <button className='bg-gray-600 hover:bg-gray-800 py-2 shadow-md text-white w-full rounded-md'>Edit List</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCart