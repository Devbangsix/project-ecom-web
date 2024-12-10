import React, { useEffect, useState } from 'react'
import { listProduct, listProductBy } from '../../api/product'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import ProductCart from '../cart/ProductCart'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data, setdate] = useState([])



    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('updatedAt', 'desc', 12)
            .then((res) => {
                setdate(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) => (
                    <SwiperSlide>
                        <ProductCart key={index} item={item} />
                    </SwiperSlide>

                ))}
        </SwiperShowProduct>
    )
}

export default NewProduct