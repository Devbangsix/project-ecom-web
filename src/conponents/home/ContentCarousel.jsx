import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay ,Navigation, HashNavigation } from 'swiper/modules';



const ContentCarousel = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        hdlGetImage()
    }, [])

    const hdlGetImage = () => {
        axios.get('https://picsum.photos/v2/list?page=1&limit=20')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }
    return (
        <div className='mb-4 p-4'>
            <Swiper
                spaceBetween={30}
                hashNavigation={{
                  watchState: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination,Autoplay ,Navigation, HashNavigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper h-80 object-cover rounded-md mb-4"
            >
                {
                    data?.map((item, index) =>
                        <SwiperSlide  key={index}><img  src={item.download_url} /></SwiperSlide>
                    )
                }

            </Swiper>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper object-cover rounded-md"
            >
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}><img  src={item.download_url} /></SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}

export default ContentCarousel