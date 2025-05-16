import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import OurServices_1 from "../../assets/Images/OurServices_1.svg";
import OurServices_2 from "../../assets/Images/OurServices_2.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from "sweetalert2";

const servicesData = [
  {
    id: 1,
    title: "Premium Brake Pads",
    description:
      "tullamcorper orci, non gravida tortor nibh non lorem. Integer non felis nec justo",
    image: "https://api.progarage.store/static/services/123.png",
  },
  {
    id: 2,
    title: "Suspension Tuning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien ullamcorper orci, non gravida tortor nibh non lorem. Integer non felis nec justo",
    image: "https://api.progarage.store/static/services/234.png",
  },
  {
    id: 3,
    title: "Premium Brake Pads",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisl at facilisis hendrerit, arcu sapien ullamcorper orci, non gravida tortor nibh non lorem. Integer non felis nec justo",
    image: "https://api.progarage.store/static/services/123.png",
  },
];

const OurServices = () => {
  // when click in read more button, it will display sweet alert with the service title and description
  const handleReadMore = (title, description) => {
    Swal.fire({
      title: title,
      text: description,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  return (
    <section className="py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center justify-content-between mb-4">
          <div className="col-md-2 d-none d-md-block">
            <div
              className="border border-2 border-dark rounded-circle p-3 d-flex justify-content-center align-items-center overflow-hidden"
              //   style={{ width: "80px", height: "80px" }}
            >
              <img
                src={OurServices_1}
                alt="Our Services"
                className="img-fluid"
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/300";
                  e.target.alt = "Service placeholder";
                }}
              />
            </div>
          </div>

          <div className="col-md-8 text-center">
            <motion.h2
              className="fw-bold text-danger border-bottom border-danger pb-2 d-inline-block"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Most Popular Products & Services
            </motion.h2>
            <p className="text-muted mt-2">
              Top-selling auto parts and services trusted by many. From
              essential repairs to high-demand spares — everything you need to
              keep your car running smoothly.
            </p>
          </div>

          <div className="col-md-2 ms-auto d-none d-md-block">
            <div className="d-flex justify-content-end">
                <div className="border border-2 border-dark rounded-circle p-3 d-flex justify-content-center align-items-center overflow-hidden">
                  <img
                    src={OurServices_2}
                    alt="Our Services"
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Service placeholder";
                    }}
                  />
              </div>
            </div>
          </div>
        </div>

        {/* Services Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            className="py-4"
          >
            {servicesData.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="card h-100 shadow-sm ">
                  <img
                    src={service.image}
                    className="card-img-top"
                    alt={service.title}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Service placeholder";
                    }}
                  />
                  <div className="card-body ">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold">{service.title}</h5>
                      <span
                        className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fas fa-tools text-white"></i>
                      </span>
                    </div>
                    <p className="card-text text-muted">
                      {service.description}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 pb-3">
                    <button
                      className="btn btn-outline-danger px-3 rounded-2 d-inline-flex align-items-center"
                      onClick={() =>
                        handleReadMore(service.title, service.description)
                      }
                    >
                      Read More
                      <i className="fas fa-chevron-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
