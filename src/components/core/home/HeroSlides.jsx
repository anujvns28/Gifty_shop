import React from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import slid1 from "../../../assets/slide-1.webp";
import slid2 from "../../../assets/Advance-Resin-Art.jpg";
import slid3 from "../../../assets/IMG_4197.webp";

const HeroSlides = () => {
  const largeSlides = [slid1, slid2, slid3, slid2];

  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={10}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
        >
          {largeSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                className="w-full sm:h-[550px] h-[300px] object-cover rounded-md"
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-center flex-col py-5 sm:py-20 gap-5">
        <h1 className="sm:text-3xl text-xl font-semibold tracking-wide text-center">
          Transform Spaces with Exquisite Resin Art
        </h1>
        <p className="text-center sm:w-[50%] sm:text-xl text-sm">
          Discover unique, handcrafted resin creations that bring elegance and
          vibrant artistry to your home. From modern designs to timeless pieces,
          our resin art is made to inspire.
        </p>
      </div>
    </div>
  );
};

export default HeroSlides;
