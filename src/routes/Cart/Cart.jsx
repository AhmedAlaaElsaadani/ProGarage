import { authContext } from "../../Contexts/authContext";
import { basketContext } from "../../Contexts/basketContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Heading from "../../Components/Ui/Heading/Heading";
import ApiManager from "../../Utilies/ApiManager";

const Cart = () => {
  const { isRegistered, token } = useContext(authContext);
  const navigate = useNavigate();
  const {
    basket,
    getBasket,
    removeBasketItem,
    clearBasket,
    applyCoupon,
    coupon,
    setCoupon,
    increaseItemQuantityByOne,
    decreaseItemQuantityByOne,
  } = useContext(basketContext);

  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure you want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeBasketItem(id);
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const clear = async () => {
    Swal.fire({
      title: "Are you sure you want to clear the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await clearBasket();
        Swal.fire("Cleared!", "Cart has been cleared.", "success");
      }
    });
  };
  const payNow = async () => {
    if (isRegistered) {
      try {
        const response = await ApiManager.requestOrder(basket.id, token);

        if (response.data.success) {
          Swal.fire({
            title: "Order Created Successfully!",
            text: `Order ID: ${response.data.data.id}`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(`/my-orders/${response.data.data.id}`);
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message || "Something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Order creation failed:", error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong while creating the order.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "You must be logged in to proceed",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  const formatPrice = (price) => {
    return price?.toFixed(2) || "0.00";
  };

  useEffect(() => {
    getBasket();
  }, []);

  // Loading state
  if (!basket) {
    return (
      <section id="cart">
        <Heading heading="Cart" />
        <div className="container pt-3">
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty cart state
  if (!basket.items || basket.items.length === 0) {
    return (
      <section id="cart">
        <Heading heading="Cart" />
        <div className="container pt-3 my-5">
          <div className="text-center my-5">
            <div className="alert alert-danger" role="alert">
              <h4>Your cart is empty</h4>
              <p className="mt-3 mb-4">There aren't any items in Cart, Add items to Start Shopping</p>
              <Link to="/products" className="btn-web btn-web-primary w-100">
                Go To Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cart">
      <Heading heading="Cart" />
      <div className="container pt-3 my-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Cart Items Table */}
            <div className="card shadow-sm">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Shopping Cart ({basket.items.length} items)</h6>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={clear}
                  title="Clear Cart"
                >
                  <i className="fa fa-trash"></i> Clear Cart
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className="align-middle">
                            <img
                              src={item.imageUrl || '/api/placeholder/60/60'}
                              alt={item.name || item.itemName}
                              className="img-thumbnail"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                          </td>
                          <td className="align-middle">
                            <div className="fw-semibold">
                              {item.name || item.itemName}
                            </div>
                          </td>
                          <td className="align-middle">
                            {formatPrice(item.price)} LE
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-outline-danger btn-sm me-2"
                                onClick={async () => decreaseItemQuantityByOne(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="mx-2 fw-bold">{item.quantity}</span>
                              <button
                                className="btn btn-outline-success btn-sm ms-2"
                                onClick={async () => increaseItemQuantityByOne(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="align-middle fw-bold">
                            {formatPrice(item.total || (item.price * item.quantity))} LE
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeItem(item.id)}
                              title="Remove Item"
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">Cart Details</h6>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <span className="text-muted">Order Subtotal</span>
                  </div>
                  <div className="col-sm-6 text-end">
                    <span className="fw-bold">
                      {formatPrice(basket.totalPriceBefore)} LE
                    </span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <span className="text-muted">Shipping</span>
                  </div>
                  <div className="col-sm-6 text-end">
                    <span>250.00 LE</span>
                  </div>
                </div>

                {/* Discount Display */}
                {basket.totalPriceBefore !== basket.totalPrice && (
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <span className="text-muted">Discount</span>
                    </div>
                    <div className="col-sm-6 text-end">
                      <span className="text-success fw-bold">
                        -{formatPrice(basket.totalPriceBefore - basket.totalPrice)} LE
                      </span>
                    </div>
                  </div>
                )}

                <hr />

                {/* Coupon Section */}
                <div className="mb-3">
                  <label htmlFor="couponInput" className="form-label text-muted">
                    Coupon
                  </label>
                  {basket?.coupon ? (
                    <div className="alert alert-success d-flex justify-content-between align-items-center">
                      <span>Applied: {basket.coupon.code}</span>
                      <span className="badge bg-danger">
                        {basket.coupon.couponType === 1
                          ? `${basket.coupon.discount}%`
                          : `${basket.coupon.discount} LE`
                        }
                      </span>
                    </div>
                  ) : (
                    <div className="input-group">
                      <input
                        id="couponInput"
                        type="text"
                        className="form-control shadow-none"
                        style={{ outline: 'none !important' }}
                        placeholder="Enter coupon code"
                        value={coupon || ''}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => applyCoupon(coupon)}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Coupon Details */}
                {basket.coupon && (
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <span className="text-muted">Coupon Details</span>
                    </div>
                    <div className="col-sm-6 text-end">
                      <span className="text-success">
                        {basket.coupon.couponType === 1
                          ? `${basket.coupon.discount}%`
                          : `${basket.coupon.discount} LE`
                        } off
                      </span>
                    </div>
                  </div>
                )}

                <hr />

                {/* Total */}
                <div className="row mb-4">
                  <div className="col-sm-6">
                    <span className="h6">Total</span>
                  </div>
                  <div className="col-sm-6 text-end">
                    <span className="h5 text-danger fw-bold">
                      {formatPrice(basket.totalPrice + 250)} LE
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <div className="d-grid">
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={payNow}
                  >
                    Oder Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;