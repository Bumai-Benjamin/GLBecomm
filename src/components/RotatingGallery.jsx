import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import { GALLERY } from '../data/gallery'

export default function RotatingGallery(){
  return (
    <section style={{padding: '24px 0'}}>
      <div className="gallery">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={5000}
          loop
          freeMode
          slidesPerView={2}
          breakpoints={{ 640:{slidesPerView:3}, 900:{slidesPerView:4}, 1200:{slidesPerView:5} }}
          spaceBetween={16}
        >
          {GALLERY.map((file, i)=> (
            <SwiperSlide key={i}>
              <div className="gallery-item">
                <img src={`/assets/${file}`} alt="Gallery item" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
