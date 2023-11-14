import React from 'react';
import banner1 from '../assets/banner-image-2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper';

const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false
                }}
                speed="50"
                pagination={{
                    clickable: true
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="aspect-auto h-96 w-full object-fill"
                        src={banner1}
                        alt="image slide 1"
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        className="aspect-auto h-96 w-full object-fill"
                        src="https://richmanbd.com/wp-content/uploads/2021/01/960.jpg"
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="aspect-auto h-96 w-full object-fill"
                        src="https://www.aarong.com/media/wysiwyg/eid-ul-adha-clp-mb-08062023.jpg"
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;
