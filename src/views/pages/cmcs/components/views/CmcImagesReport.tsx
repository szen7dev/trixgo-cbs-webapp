import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";

import styles from "../../styles.module.css";

import image1 from "assets/images/ProjectPage/image 161.jpg";
import image2 from "assets/images/ProjectPage/image 162.jpg";
import image3 from "assets/images/ProjectPage/image 163.jpg";
import image4 from "assets/images/ProjectPage/image 164.jpg";

const CmcImagesReport: FC = () => {
  return (
    <div className="w-full py-2 flex bg-primary-light">
      <div className="flex items-center">
        <button
          className={cn(
            styles.prev,
            "w-10 h-10 flex items-center justify-center"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <Swiper
        observer
        observeParents
        parallax
        slidesPerView={5}
        navigation={{
          nextEl: "." + styles.next,
          prevEl: "." + styles.prev,
        }}
      >
        <SwiperSlide>
          <img
            src={image1}
            alt="image1"
            className="mx-auto object-cover"
            height="115px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            alt="image2"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
            alt="image3"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image4}
            alt="image4"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image4}
            alt="image4"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image4}
            alt="image4"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            alt="image2"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image1}
            alt="image1"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
            alt="image3"
            className="mx-auto object-cover"
            height="130px"
          />
        </SwiperSlide>
      </Swiper>

      <div className="flex items-center">
        <button
          className={cn(
            styles.next,
            "w-10 h-10 flex items-center justify-center"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CmcImagesReport;
