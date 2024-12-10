import React from 'react'
import ContentCarousel from '../conponents/home/ContentCarousel'
import BestSeller from '../conponents/home/BestSeller'
import NewProduct from '../conponents/home/NewProduct'

const home = () => {
  return (
    <div>
    <ContentCarousel />
    <p className='text-2xl text-center my-4'>BestSell</p>
    <BestSeller />
    <p className='text-2xl text-center my-4'>NewProduct</p>
    <NewProduct />
    </div>
  )
}

export default home