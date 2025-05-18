import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { authContext } from "../../Contexts/authContext";
import { basketContext } from "../../Contexts/basketContext";
import Swal from "sweetalert2";
import style from "./ProductDetails.module.css";
import ApiManager from "../../Utilies/ApiManager";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isRegistered } = useContext(authContext);
  const { addBasketItem, containInBasket } = useContext(basketContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getProductsById(id);
        
        if (response.data && response.data.success && response.data.data.data.length > 0) {
          setProduct(
            // {
                
            //     "id": 14,
            //     "title": "oil filter",
            //     "description": "Korean",
            //     "price": 350.00,
            //     "year": 2015,
            //     "transmission": "Automatic",
            //     "trader": "تاجر Trader",
            //     "traderId": "e61bd208-0593-43ea-905d-aab9f8cd05c1",
            //     "brandId": 10,
            //     "brand": "Hyundai",
            //     "typeId": 8,
            //     "type": "Crossover",
            //     "category": "Wheels",
            //     "categoryId": 1,
            //     "images": [
            //         "https://api.progarage.store/static/Products/9965854.png",
            //         "https://api.progarage.store/static/Products/9965854.png",
            //         "https://api.progarage.store/static/Products/9965854.png",
            //         "https://api.progarage.store/static/Products/9965854.png",
            //     ]
            // }
            response.data.data.data[0]
        );
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const createItemToCart = () => {
    const item = {
      id: product.id,
      url: `${window.location.origin}/ProductDetails/${product.id}`,
      name: product.title,
      imageUrl: product.images[0],
      price: product.price,
      quantity: 1,
    };
    return item;
  };

  const handleAddToCart = () => {
    if (!isRegistered) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be logged in to add products to your cart.",
      }).then(() => {
        navigate("/login");
      });
      return;
    } else {
      const item = createItemToCart();
      addBasketItem(item);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: "Product has been added to your cart successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error!</h4>
              <p>{error}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Product Not Found</h4>
              <p>The product you're looking for doesn't exist.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://lexproducts.com/admin/storage/uploads/2022/06/08/62a0aa0f9834bNo-Image-Available.jpg"];

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className={style.productImageSection}>
            {/* Main Image Carousel */}
            <div id="productCarousel" className="carousel slide" data-bs-ride="false">
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  >
                    <div className={style.mainImageContainer}>
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className={style.mainImage}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Carousel Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    className="carousel-control-prev" 
                    type="button" 
                    data-bs-target="#productCarousel" 
                    data-bs-slide="prev"
                    onClick={() => setActiveImageIndex(prev => 
                      prev === 0 ? images.length - 1 : prev - 1
                    )}
                  >
                    <span className={style.carouselControlIcon}>
                      <i className="fas fa-chevron-left"></i>
                    </span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button 
                    className="carousel-control-next" 
                    type="button" 
                    data-bs-target="#productCarousel" 
                    data-bs-slide="next"
                    onClick={() => setActiveImageIndex(prev => 
                      prev === images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <span className={style.carouselControlIcon}>
                      <i className="fas fa-chevron-right"></i>
                    </span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className={style.thumbnailGallery + " d-flex justify-content-center mt-3"}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${style.thumbnailContainer} ${
                      index === activeImageIndex ? style.activeThumbnail : ''
                    }`}
                    onClick={() => {
                      setActiveImageIndex(index);
                      // Manually trigger carousel to go to specific slide
                      const carousel = document.querySelector('#productCarousel');
                      if (carousel) {
                        const bsCarousel = new window.bootstrap.Carousel(carousel);
                        bsCarousel.to(index);
                      }
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className={style.thumbnailImage}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Carousel Indicators */}
            {images.length > 1 && (
              <div className="carousel-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active ' : ''}
                    aria-current={index === 0 ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => setActiveImageIndex(index)}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-lg-6">
          <div className={style.productDetails}>
            {/* Product Title */}
            <h1 className={style.productTitle}>{product.title}</h1>

            {/* Brand */}
            <div className={style.brandSection}>
              <span className={style.brandIcon}>●</span>
              <span className={style.brandName}>{product.brand}</span>
            </div>

            {/* Price */}
            <div className={style.priceSection}>
              <span className={style.currentPrice}>{product.price.toFixed(2)} L.E</span>
            </div>

            {/* Product Info */}
            <div className={style.productInfo}>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <strong>Category:</strong>
                  <span className="ms-2">{product.category}</span>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Year:</strong>
                  <span className="ms-2">{product.year}</span>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Type:</strong>
                  <span className="ms-2">{product.type}</span>
                </div>
                <div className="col-sm-6 mb-3">
                  <strong>Transmission:</strong>
                  <span className="ms-2">{product.transmission}</span>
                </div>
                <div className="col-12 mb-3">
                  <strong>Trader:</strong>
                  <span className="ms-2">{product.trader}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={style.descriptionSection}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className={style.actionButtons}>
              <button
                onClick={handleAddToCart}
                className={`btn-web btn-web-outline-primary w-100`}
                disabled={containInBasket(product.id)}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                {containInBasket(product.id) ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;