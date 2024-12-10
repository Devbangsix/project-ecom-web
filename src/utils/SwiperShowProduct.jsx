import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay, Navigation } from 'swiper/modules';




const SwiperShowProduct = ({ children }) => {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            pagination={true}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                200: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                320: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1500: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
            className="mySwiper object-cover rounded-md"
        >

            {children}

        </Swiper>
    )
}

export default SwiperShowProduct