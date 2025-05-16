import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import React from "react";
import { Link } from "react-router-dom";
import style from "./HomeScrollBar.module.css";
import categoryImage from "../../assets/Images/category.png"; // Replace with your actual image path
export default function HomeScrollBar({ categories }) {
  // Define categories with exactly 5 items
  const categoriesX = [
    {
      id: 1,
      title: "Spare parts",
      image:
        "https://th.bing.com/th/id/OIP.foZwLuG4H4xlEEKLDcZF9gHaD8?w=327&h=180&c=7&r=0&o=5&pid=1.7", // Replace with your actual wheel icon path
    },
    {
      id: 2,
      title: "Spare parts",
      image:
        "https://th.bing.com/th/id/OIP.foZwLuG4H4xlEEKLDcZF9gHaD8?w=327&h=180&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 3,
      title: "Spare parts",
      image:
        "https://th.bing.com/th/id/OIP.foZwLuG4H4xlEEKLDcZF9gHaD8?w=327&h=180&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 4,
      title: "Spare parts",
      image:
        "https://th.bing.com/th/id/OIP.foZwLuG4H4xlEEKLDcZF9gHaD8?w=327&h=180&c=7&r=0&o=5&pid=1.7",
    },
    {
      id: 5,
      title: "Spare parts",
      image:
        "https://th.bing.com/th/id/OIP.foZwLuG4H4xlEEKLDcZF9gHaD8?w=327&h=180&c=7&r=0&o=5&pid=1.7",
    },
  ];

  return (
    <div
      className={style.homeScrollBarContainer}
      style={{ backgroundColor: "#AA0000" }}
    >
      <h2 className={style.heading}>What are you looking for?</h2>
      <div className="container">
        <div className={style.swiperWrapper + " row"}>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            scrollbar={{
              draggable: true,
              hide: false,
              el: `.${style.customScrollbar}`,
            }}
            breakpoints={{
              // When window width is >= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // When window width is >= 480px
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              // When window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              // When window width is >= 768px
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Scrollbar, Navigation]}
            className={style.categorySwiper}
          >
            {categoriesX.map((category) => (
              <SwiperSlide key={category.id} className={style.categorySlide}>
                <div className={style.categoryCard}>
                  <div className={style.iconContainer}>
                    <img
                      src={categoryImage}
                      alt={category.title}
                      className={style.categoryIcon}
                    />
                  </div>
                  <p className={style.categoryTitle}>{category.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={style.customScrollbar}></div>
        </div>
      </div>

      <div className={style.shopNowContainer}>
        <Link to="/products" className={style.shopNowButton}>
          Shop Now
        </Link>
      </div>
    </div>
  );
}
