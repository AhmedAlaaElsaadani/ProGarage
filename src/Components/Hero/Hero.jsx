import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import homeBackground from "../../assets/Images/homeBackground.jpg";
import { Link } from "react-router-dom";

const defaultProducts = [

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
const Hero = ({ products }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayProducts, setDisplayProducts] = useState(defaultProducts)

  useEffect(() => {
    if (products && products.length > 0) {

      setDisplayProducts(products)
    }
    console.log("Fadsigj", displayProducts)
    console.log(products);


  }, [])


  const backgroundImageUrl = homeBackground;

  // Debug active slide
  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => {
        setActiveIndex(swiper.realIndex);
        console.log("Active slide index:", swiper.realIndex);
        console.log("Current product:", displayProducts[swiper.realIndex]);
      };

      swiper.on('slideChange', handleSlideChange);

      return () => {
        swiper.off('slideChange', handleSlideChange);
      };
    }
  }, [swiper, displayProducts]);

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
        className="position-absolute rounded-bottom-5"
        style={{
          right: "15%",
          top: "0",
          zIndex: 2,
          pointerEvents: "none",
          width: "160px",
          height: "50%",
          backgroundColor: "#d30000"
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
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{ height: "100%", zIndex: 10 }}
        initialSlide={0}
        onSwiper={setSwiper}
      >
        {displayProducts.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div
              className="position-relative d-flex align-items-center"
              style={{ height: "100%" }}
            >
              {/* Product info container */}
              <div className="container text-white" style={{ zIndex: 15, position: "relative" }}>
                <div className="product-info-container">
                  <p className="mb-1">Turbo Start-up</p>
                  <h2 className="display-3 fw-bold mb-0">
                    {product.title} Bundle pro
                  </h2>
                  <h2 className="display-3 fw-bold mb-4">Series</h2>
                  <p className="fs-3 mb-4">
                    {product.price.toLocaleString()} L.E
                  </p>
                  <Link className="btn-web btn-web-primary text-white" to="/products">
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* Product image */}
              <div
                className="product-image-container  d-none d-md-block "
                style={{ position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div
        className="swiper-button-prev position-absolute rounded-circle d-flex justify-content-center align-items-center"
        style={{
          left: "20px",
          top: "50%",
          backgroundColor: "#d30000",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "40px",
          height: "40px",
          cursor: "pointer",
          color: "white",
        }}
      >
        <span className="text-white">&lt;</span>
      </div>

      <div
        className="swiper-button-next position-absolute rounded-circle d-flex justify-content-center align-items-center"
        style={{
          right: "20px",
          top: "50%",
          backgroundColor: "#d30000",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: "40px",
          height: "40px",
          cursor: "pointer",
          color: "white",
        }}
      >
        <span className="text-white">&gt;</span>
      </div>


      <style jsx>{`
        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none;
        }
        
      `}</style>
    </div>
  );
};

export default Hero;