// src/components/GiveMinistries.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import background from "../assets/images/background.png";
import nfocc from "../assets/images/necocc.png";
import scriptureChurch from "../assets/images/scriptureChurch.png";
import tapon from "../assets/images/tapon.png";
import kirkwood from "../assets/images/kirkwood.png";
import aagba from "../assets/images/aagba.png";
import reach from "../assets/images/reach-logo.png";

const ministries = [
  { img: nfocc },
  { img: scriptureChurch },
  { img: tapon },
  { img: kirkwood },
  { img: aagba },
  { img: reach },
];

const GiveMinistries = () => {
  return (
    <section
      className="py-16 px-4 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-gray-800">Fellowship</span> Ministries
        </h2>
        <div className="mt-2 h-1 w-24 bg-yellow-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          Your donations support these ministries and their mission.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className="relative max-w-6xl mx-auto pb-12"
      >
        {ministries.map(({ img }, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 flex items-center justify-center bg-white rounded-lg shadow-md">
              <img
                src={img}
                alt="Ministry Logo"
                className="w-full h-full object-contain p-6 select-none pointer-events-none"
                draggable="false"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styling */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.5);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: none;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #facc15;
          color: black;
        }
        .swiper-pagination {
          bottom: 0 !important;
          margin-top: 20px;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #facc15;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default GiveMinistries;
