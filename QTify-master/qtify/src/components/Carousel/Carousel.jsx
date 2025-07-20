import React from "react";
import styles from "./carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import CarouselLeftNavigation from "./Carousel Left Navigation/CarouselLeftNavigation";
import CarouselRightNavigation from "./Carousel Right Navigation/CarouselRightNavigation";
import "swiper/css";
import "swiper/css/navigation";

const Carousel = ({ data, component }) => {
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        initialSlide={0}
        modules={{ Navigation }}
        slidesPerView={"auto"}
        spaceBetween={"40"}
        allowTouchMove
      >
        <CarouselLeftNavigation />
        <CarouselRightNavigation />
        {data?.map((item) => (
          <SwiperSlide key={item?.id}>{component(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
