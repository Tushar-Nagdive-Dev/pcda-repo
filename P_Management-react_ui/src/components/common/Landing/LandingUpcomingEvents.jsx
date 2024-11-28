import React, { useRef } from "react";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import CarouselWithTitleCard from "../CarouselWithTitleCard";
import styles from "./LandingUpcomingEvents.module.css";

import armyGroup from "@/assets/images/army.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper/modules";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: armyGroup,
    section: "Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    image: armyGroup,
    section: "Lorem ipsum dolor sit amet",
  },
  {
    id: 3,
    image: armyGroup,
    section: "Lorem ipsum dolor sit amet",
  },
  {
    id: 4,
    image: armyGroup,
    section: "Lorem ipsum dolor sit amet",
  },
];

function LandingUpcomingEvents() {
  const swiperRefs = useRef([]);

  const handleNext = (index) => {
    if (swiperRefs.current[index]) {
      swiperRefs.current[index].slideNext();
    }
  };

  const handlePrev = (index) => {
    if (swiperRefs.current[index]) {
      swiperRefs.current[index].slidePrev();
    }
  };

  return (
    <div className="flex flex-col gap-7 my-24">
      <LeftBorderWithTitle
        textSize="text-2xl"
        title="Upcoming Events"
        className="text-mainprimarycolor"
      />
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselWithTitleCard title="Event Name" key={index}>
            <>
              <div className={styles["custom-swiper-container"]}>
                <Swiper
                  slidesPerView={1}
                  navigation={true}
                  freeMode={true}
                  modules={[FreeMode, Navigation]}
                  loop={true}
                  autoplay={{ delay: 1200 }}
                  className={styles["my-swiper"]}
                  onSwiper={(swiper) => (swiperRefs.current[index] = swiper)}
                >
                  {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={styles["my-slide"]}>
                      <div className={styles["image-wrapper"]}>
                        <img src={slide.image} alt={`Slide ${slide.id}`} />
                        {/* <div
                      className={styles["gradient-overlay"]}
                    ></div> */}
                        <div className={styles["text-container"]}>
                          <p className={styles["slide-title"]}>Lorem Ipsum</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className={styles["custom-prev"]}
                  onClick={() => handlePrev(index)}
                >
                  <CaretLeft size={20} />
                </button>
                <button
                  className={styles["custom-next"]}
                  onClick={() => handleNext(index)}
                >
                  <CaretRight size={20} />
                </button>
              </div>
              <div className="flex flex-col space-y-5 my-5 px-2">
                <ul className="list-disc list-inside space-y-5 text-secondaryGrey">
                  <li className="relative pl-5 line-clamp-2 before:content-['•'] before:absolute before:left-0 before:text-secondaryGrey">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit nostrum veritatis alias assumenda reiciendis ex fuga
                    eius ullam excepturi nobis omnis pariatur eaque repellendus
                    ad dolores, minima vitae unde voluptatem!
                  </li>
                  <li className="relative pl-5 line-clamp-2 before:content-['•'] before:absolute before:left-0 before:text-secondaryGrey">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit nostrum veritatis alias assumenda reiciendis ex fuga
                    eius ullam excepturi nobis omnis pariatur eaque repellendus
                    ad dolores, minima vitae unde voluptatem!
                  </li>
                </ul>
                <Link to="#" className="text-linktext flex items-center gap-1">
                  View More <ArrowRight size={16} color="#008BF9" />
                </Link>
              </div>
            </>
          </CarouselWithTitleCard>
        ))}
      </div>
    </div>
  );
}

export default LandingUpcomingEvents;
