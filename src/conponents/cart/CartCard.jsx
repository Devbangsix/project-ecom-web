import React from 'react'
import { Trash2 } from 'lucide-react';
import uesEcomStore from '../../store/ecom-store';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const CartCard = () => {
    const carts = uesEcomStore((state) => state.carts)
    const actionUpdateQuantity = uesEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = uesEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = uesEcomStore((state) => state.getTotalPrice)
    console.log(carts)
    return (
        <div>
            <p className='text-2xl font-bold'>Shopping Cart</p>
            <div className='border p-2 '>
                {
                    carts.map((item, index) =>

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
                                        <p className='text-sm'>{item.description}</p>

                                    </div>
                                </div>
                                <div onClick={() => actionRemoveProduct(item.id)} className='flex text-center items-center text-red-600 '>
                                    <Trash2 />
                                </div>

                            </div>
                            {/* row 2 */}
                            <div className='flex justify-between'>
                                {/* left */}
                                <div className='border rounded-sm px-2 py-1 felx items-center'>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                        className='px-2 py1 bg-gray-200 hover:bg-gray-600'><Minus size={16} /></button>
                                    <span className=' px-4 bg-white'>{item.count}</span>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                        className='px-2 py1 bg-gray-200 hover:bg-gray-600'><Plus size={16} /></button>
                                </div>
                                {/* Right */}
                                <div className='font-bole text-blue-500'>
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* total */}
                <div className='flex justify-between px-2'>
                    <span>Total</span>
                    <span>{getTotalPrice()}</span>
                </div>
                <Link to={'/cart'}>
                    <button className='text-white w-full py-2 rounded-md bg-green-500 hover:bg-green-700'>Confirm</button>
                </Link>
            </div>
        </div>
    )
}

export default CartCard