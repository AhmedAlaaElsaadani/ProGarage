import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import homeBackground from "../../assets/Images/homeBackground.jpg";
import { Link } from "react-router-dom";

const Hero = ({ products }) => {
  const defaultProducts = [
    {
      id: 8,
      price: 15000,
      title: "Engine",
      category: "Engine Parts",
      image: "/images/turbocharger.png", // يجب أن تكون شفافة PNG
    },
    {
      id: 11,
      price: 50000,
      title: "Gearbox",
      category: "Transmission",
      image: "/images/gearbox.png",
    },
    {
      id: 14,
      price: 350,
      title: "Oil Filter",
      category: "Maintenance",
      image: "/images/oil-filter.png",
    },
  ];

  const displayProducts = products || defaultProducts;
  const backgroundImageUrl = homeBackground; // صورة السيارة

  return (
    <div
      className="hero-container position-relative"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div
        className="position-absolute"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        />
      </div>

      <div
        className="position-absolute  rounded-bottom-5"
        style={{
          right: "15%",
          top: "0",
        //   transform: "translateY(-50%)",
          width: "160px",
          height: "50%",
          backgroundColor: "#d30000",
          zIndex: 5,
        }}
      />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{ height: "100%", zIndex: 10 }}
      >
        {displayProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="position-relative d-flex align-items-center"
              style={{ height: "100%" }}
            >
              <div className="container text-white" style={{ zIndex: 15 }}>
                <p className="mb-1">Turbo Start-up</p>
                <h1 className="display-3 fw-bold mb-0">
                  {product.title} Bundle pro
                </h1>
                <h1 className="display-3 fw-bold mb-4">Series</h1>
                <p className="fs-3 mb-4">
                  {product.price.toLocaleString()} L.E
                </p>
                <Link className="btn-web btn-web-primary text-white  " to="/products">
                  Shop Now
                </Link>
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="position-absolute"
                style={{
                  right: "10%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="swiper-button-prev position-absolute rounded-circle d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
        style={{
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        <span className="text-white">&lt;</span>
      </div>

      <div
        className="swiper-button-next position-absolute rounded-circle d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
        style={{
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      >
        <span className="text-white">&gt;</span>
      </div>

      <div
        className="swiper-pagination position-absolute d-flex justify-content-center"
        style={{ bottom: "20px", left: 0, right: 0, zIndex: 20 }}
      ></div>

      <style jsx>{`
        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          margin: 0 5px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #d30000;
        }
      `}</style>
    </div>
  );
};

export default Hero;
