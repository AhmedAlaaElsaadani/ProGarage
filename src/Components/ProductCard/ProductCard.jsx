import React from "react";
import style from "./ProductCard.module.css";
import carDoorImage from "../../assets/Images/door.jpg";

const ProductCard = ({ product }) => {
  const { title, brand, price, year, images } = product;
  const handleAddToCart = () => {
    console.log(`Added ${title} to cart`);
  };

  const handleAddToWishlist = () => {
    console.log(`Added ${title} to wishlist`);
  };

  return (
    <div className="card h-100 product-card position-relative">
      {/* Image container */}
      <div className={style["product-image-container"] + " p-3"}>
        <img
          src={
            // imageUrl ||
            carDoorImage
          }
          alt={title}
          className="product-image img-fluid"
        />
      </div>

      {/* year badge - conditionally rendered */}

      <div className={"position-absolute " + style.discount}>{year}</div>

      {/* Product info */}
      <div className="card-body d-flex flex-column">
        {/* Product name */}
        <div className={style["product-heading"]}>
          <h5 className={"card-title " + style["product-name"]}>{title}</h5>

          <div
            className={
              "d-flex align-items-center mb-2 " + style["product-brand"]
            }
          >
            <span className="brand-dot text-danger me-1">●</span>
            {brand}
          </div>
        </div>
        <div className={style["product-price-container"]}>
          {/* Price - positioned at bottom of info section */}
          <p className="product-price fw-bold">{price} L.E</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="card-footer bg-light p-2 d-flex">
        <button
          onClick={handleAddToCart}
          className="btn-web btn-web-outline-primary  flex-grow-1 add-to-cart-btn"
        >
          Add to Cart
          <i className="fa-solid fa-cart-shopping mx-3"></i>
        </button>

        {/* <button
          onClick={handleAddToWishlist}
          className="btn-web btn-web-primary ms-2 wishlist-btn"
          aria-label="Add to wishlist"
        >
          ♡
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
