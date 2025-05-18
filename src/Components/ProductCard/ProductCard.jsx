import React, { useContext } from "react";
import style from "./ProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/authContext";
import Swal from "sweetalert2";
import { basketContext } from "../../Contexts/basketContext";

const ProductCard = ({ product }) => {
  const { title, brand, price, year, images } = product;
  const { token, isRegistered } = useContext(authContext);
  const navigate = useNavigate();
  const { addBasketItem, containInBasket } =
    useContext(basketContext);

  const createItemToCart = () => {
    const item = {
      id: product.id,
      url: `${window.location.origin}/ProductDetails/${product.id}`,
      name: product.title,
      imageUrl: product.images[0] ||
        "https://lexproducts.com/admin/storage/uploads/2022/06/08/62a0aa0f9834bNo-Image-Available.jpg",
      price: product.price,
      quantity: 1,
    };
    return item;
  };

  const handleAddToCart = () => {
    // not Registered
    if (!isRegistered) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be logged in to add products to your cart.",
      }).then(() => {
        navigate("/login");
      });
      return;
    }
    else {
      const item = createItemToCart();
      addBasketItem(item);
    }
  };

  return (
    <div className="card h-100 product-card position-relative">
      {/* Image container */}
      <div className={style["product-image-container"] + " p-3"}>
        <img
          src={
            images[0] ||
            "https://lexproducts.com/admin/storage/uploads/2022/06/08/62a0aa0f9834bNo-Image-Available.jpg"
          }
          alt={title}
          className="product-image img-fluid"
        />
      </div>

      {/* year badge - conditionally rendered */}

      <div className={"position-absolute " + style.year}>{year}</div>

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
          disabled={containInBasket(product.id)}

        >

          {containInBasket(product.id) ? "In Cart" : "Order"}
          {/* <i className="fa-solid fa-cart-shopping mx-3"></i> */}
        </button>

        <Link
          to={`/product/${product.id}`}
          className="btn-web btn-web-primary ms-2 wishlist-btn"
          aria-label="Add to wishlist"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
