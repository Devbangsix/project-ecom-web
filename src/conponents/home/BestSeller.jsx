import React, { useEffect, useState } from 'react'
import { listProduct, listProductBy } from '../../api/product'
import ProductCart from '../cart/ProductCart'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperShowProduct from '../../utils/SwiperShowProduct';
const BestSeller = () => {
    const [data, setdate] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('sold', 'desc', 10)
            .then((res) => {
                setdate(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) => (
                    <SwiperSlide >
                        <ProductCart key={index} item={item} />
                    </SwiperSlide>
                    // <ProductCart item={item} />
                ))}
        </SwiperShowProduct>
    )
}

export default BestSeller