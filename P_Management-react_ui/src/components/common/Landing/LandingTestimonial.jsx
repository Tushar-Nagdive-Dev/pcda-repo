import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import landingTestminionalCss from "./LandingTestimonial.module.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import apiClient from "../../../auth/ApiClient.jsx"; // Replace with actual API client import
import testimionalImage from "../../../assets/images/testimional.jpeg"; // Background image

function LandingTestimonial() {
  const [slides, setSlides] = useState([]); // Store fetched testimonials
  const swiperRef = useRef(null);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await apiClient.get("/testimonial"); // Fetch testimonials
        const baseUrl = ""; // Replace with your actual base URL

        const mappedSlides = data.map((testimonial) => ({
          id: testimonial.id,
          comment: testimonial.testimonialBrief, // Testimonial comment
          person_picture: testimonial.imagePath
            ? baseUrl + testimonial.imagePath
            : baseUrl + "default-profile.png", // Fallback to default image
          person_name: testimonial.name, // Testimonial giver's name
          person_role: testimonial.position, // Their position (e.g., Manager)
        }));

        setSlides(mappedSlides);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Swiper Navigation Handlers
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="w-full h-full px-custom my-24">
      <div className="flex flex-col space-y-6">
        <h4 className="text-titleColor text-3xl font-bold">Testimonials</h4>
        <div className="w-full relative rounded-xl overflow-hidden">
          {/* Background Image */}
          <img
            src={testimionalImage}
            alt="Testimonial Background"
            className="w-full max-h-96 object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full z-20">
            <div className={landingTestminionalCss["custom-swiper-container"]}>
              <Swiper
                slidesPerView={1}
                navigation={false}
                freeMode={true}
                modules={[FreeMode, Navigation]}
                loop={true}
                autoplay={{ delay: 3000 }}
                className={landingTestminionalCss["my-swiper"]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {/* Render Slides */}
                {slides.map((slide) => (
                  <SwiperSlide
                    key={slide.id}
                    className={landingTestminionalCss["my-slide"]}
                  >
                    <div className="h-full flex flex-col justify-between px-10">
                      <p className="max-h-44 overflow-y-auto scrollbar-thin text-justify text-titleColor w-3/4">
                        {slide.comment}
                      </p>
                      <div className="flex gap-3 w-fit">
                        {slide.person_picture ? (
                          <img
                            src={slide.person_picture}
                            alt={`${slide.person_name}'s picture`}
                            className="rounded-full w-14 h-14 border-2 border-statebluecolor"
                          />
                        ) : (
                          <div className="rounded-full w-14 h-14 bg-gray-300 flex items-center justify-center">
                            <span className="text-titleColor">No Image</span>
                          </div>
                        )}
                        <div className="flex flex-col space-y-2">
                          <p className="text-lg font-bold text-statebluecolor">
                            {slide.person_name}
                          </p>
                          <p className="text-sm text-titleColor">
                            {slide.person_role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <button
                className={landingTestminionalCss["custom-prev"]}
                onClick={handlePrev}
              >
                <CaretLeft size={32} />
              </button>
              <button
                className={landingTestminionalCss["custom-next"]}
                onClick={handleNext}
              >
                <CaretRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingTestimonial;
