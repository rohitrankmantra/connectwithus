import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

import img1 from "../assets/images/hero1.jpg";
import img2 from "../assets/images/hero2.jpg";
import FellowshipMinistries from "../components/FellowshipMinistries";
import GoogleCalendar from "../components/GoogleCalendar";

function Home() {
  const slides = [
    {
      id: 1,
      image: img1, // Placeholder image
      alt: "Building with trees in foreground",
      preHeading: "IMPROVING",
      heading: "QUALITY OF LIFE",
      description:
        "We are unified by the teachings and preaching of God's Word, the gospel of Jesus Christ, the grace of God, and our complete faith in the work of the Holy Ghost.",
    },
    {
      id: 2,
      image: img2, // Another placeholder image
      alt: "Cityscape with modern buildings",
      preHeading: "EMPOWERING",
      heading: "COMMUNITIES",
      description:
        "Our mission is to empower individuals and communities through education, support, and resources, fostering growth and sustainable development for a brighter future.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center font-inter">
        {/* Container for the Swiper */}
        <div className="w-full h-screen max-w-full overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            spaceBetween={0} // No space between slides
            slidesPerView={1} // Only one slide visible at a time
            navigation // Enable navigation arrows
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                // Custom bullet rendering to match "01", "02" style
                return (
                  '<span class="' +
                  className +
                  ' custom-swiper-pagination-bullet">' +
                  ("0" + (index + 1)) +
                  "</span>"
                );
              },
            }}
            autoplay={{
              delay: 2000, // 5 seconds delay
              disableOnInteraction: false, // Continue autoplay even after user interaction
            }}
            loop={true} // Enable looping through slides
            className="mySwiper w-full h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full flex items-center justify-start">
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/1920x1080/4A5568/CBD5E0?text=Image+Load+Error`;
                    }} // Fallback
                  />

                  {/* Overlay with a subtle gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent "></div>

                  {/* Content Overlay */}
                  <div className="relative z-10 text-white max-w-4xl w-full text-left ml-6 md:ml-20 ">
                    <h3 className="text-sm md:text-base tracking-widest opacity-80 mb-2 md:mb-4 rounded-md">
                      {slide.preHeading}
                    </h3>
                    <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-4 md:mb-6 rounded-md">
                      {slide.heading}
                    </h1>
                    <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8 max-w-2xl rounded-md">
                      {slide.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-white text-md md:text-lg font-medium hover:text-yellow-400 transition-colors duration-300 group rounded-full"
                    >
                      <span className="mr-3">Discover More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom styles for Swiper pagination to match the design */}
        <style>{`
        /* Import Swiper CSS from CDN to ensure it's available in this environment */
        @import url('https://unpkg.com/swiper/swiper-bundle.min.css');

        .swiper-pagination {
          position: absolute;
          right: 2rem !important; /* Adjust based on your design */
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-center;
          z-index: 20; /* Ensure it's above content but below navigation arrows */
        }

        .custom-swiper-pagination-bullet {
          width: auto !important;
          height: auto !important;
          background: none !important;
          opacity: 0.7 !important;
          font-size: 1.25rem; /* Large numbers */
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem; /* Space between numbers */
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem; /* Padding for the line */
        }

        .custom-swiper-pagination-bullet::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 30px; /* Length of the line */
            height: 2px;
            background-color: white;
            opacity: 0.7;
        }

        .custom-swiper-pagination-bullet-active {
          opacity: 1 !important;
          color: white !important; /* Active number is fully opaque */
        }

        .custom-swiper-pagination-bullet-active::after {
            background-color: white; /* Active line is also opaque */
            opacity: 1;
        }

        /* Adjust navigation arrows position and styling */
        .swiper-button-next,
        .swiper-button-prev {
            color: white !important; /* White arrows */
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
            opacity: 1;
        }

        /* Hide default Swiper pagination bullets if not using custom ones */
        .swiper-pagination-bullet {
            display: none;
        }
      `}</style>
      </div>

      <FellowshipMinistries/>

      <div className="mt-10">
        <GoogleCalendar/>
      </div>
    </>
  );
}

export default Home;
