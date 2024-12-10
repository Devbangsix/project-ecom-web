import React, { useEffect } from 'react'
import ProductCart from '../conponents/cart/ProductCart'
import uesEcomStore from '../store/ecom-store'
import Searchbar from '../conponents/cart/Searchbar'
import CartCard from '../conponents/cart/CartCard'

const Shop = () => {
  
  const getProduct = uesEcomStore((state) => state.getProduct)
  const products = uesEcomStore((state) => state.products)
  useEffect(() => {
    getProduct(6)
  },[])

  return (
    <div className='flex'>
      <div className='w-1/4 bg-slate-400'>
        <Searchbar />
      </div>
      <div className='w-1/2'>
        <p className='text-2xl font-bold mb-4'>Products</p>
        <div className='flex flex-wrap gap-4'>
          {
            products.map((item,index) =>
              
              <ProductCart key={index} item={item}/>
            )
          }
        </div>
      </div>
      <div className='w-1/4 bg-slate-400'>
        <CartCard />
      </div>
    </div>
  )
}

export default Shop