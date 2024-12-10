import React, { useEffect } from 'react'
import { ShoppingBag } from 'lucide-react';
import uesEcomStore from '../../store/ecom-store';
import { numberFormat } from '../../utils/number';
import { motion } from "motion/react"


const ProductCart = ({ item }) => {
    const actionAddtoCart = uesEcomStore((state) => state.actionAddtoCart)

    return (
        <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        >
        <div className='border rounded-md shadow-md p-2 w-52'>
            <div>
                {
                    item.images && item.images.length > 0
                        ? <img src={item.images[0].url} 
                        className='rounded-md w-full h-24 object-cover hover:scale-125 hover:duration-200' />
                        : <div className='w-full h-24 bg-gray-400 rounded-md
                            text-center flex items-center justify-center'>
                            No Image
                        </div>
                }

            </div>
            <div>
                <p className='text-xl truncate font-bold'>{item.title}</p>
                <p className='text-sm truncate text-gray-400'>{item.description}</p>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-sm font-bold'>{numberFormat(item.price)}</span>
                <button onClick={() => actionAddtoCart(item)} className='bg-blue-500 rounded-md p-2
            hover:bg-blue-700 shadow-md'>
                    <ShoppingBag />
                </button>
            </div>
        </div>
        </motion.div>
    )
}

export default ProductCart