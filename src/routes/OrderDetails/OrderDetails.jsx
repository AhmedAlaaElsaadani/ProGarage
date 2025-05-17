import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../Components/Ui/Heading/Heading";
import { authContext } from "../../Contexts/authContext";
import ApiManager from "../../Utilies/ApiManager";
import styles from "./OrderDetails.module.css";
import { motion } from "framer-motion";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getOrderById(token, orderId);
        setOrder(response.data.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        if (err.response.data.code == 404) {
          setOrder(null);
        } else
          setError("Failed to load order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatCurrency = (amount) => {
    return amount ? `${amount.toFixed(2)} LE` : "N/A";
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return styles.statusDelivered;
      case "pending":
        return styles.statusPending;
      case "processing":
        return styles.statusProcessing;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  const calculateDiscount = () => {
    if (!order) return 0;
    return (
      ((order.totalPriceBefore - order.totalPrice) / order.totalPriceBefore) *
      100
    ).toFixed(1);
  };

  return (
    <section id="OrderDetails">
      <Heading heading={!order ? "Order Details" : "Order No. " + orderId} />
      <div className="container py-5">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : !order ? (
          <div className="alert alert-info text-center" role="alert">
            Order not found.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="row mt-4">
              <div className="col-lg-8">
                <div className={styles.productsSection}>
                  <div className={styles.tableWrapper}>
                    <table className={styles.productsTable}>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td className={styles.productImageCell}>
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className={styles.productImage}
                                />
                              ) : (
                                <div className={styles.noImage}>No Image</div>
                              )}
                            </td>
                            <td>{item.name}</td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>{item.quantity} PCS</td>
                            <td>{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className={styles.invoiceDetails}>
                  <h3>Invoice Details</h3>
                  <div className={styles.invoiceItem}>
                    <span>Order Subtotal</span>
                    <span>{formatCurrency(order.totalPriceBefore)}</span>
                  </div>
                  <div className={styles.invoiceItem}>
                    <span>Shipping</span>
                    <span>{order.status}</span>
                  </div>
                  {order.coupon && (
                    <div className={styles.invoiceItem}>
                      <span>Coupon Details</span>
                      <span>{calculateDiscount()}%</span>
                    </div>
                  )}
                  <div className={styles.invoiceTotal}>
                    <span>Total</span>
                    <span>{formatCurrency(order.totalPrice)}</span>
                  </div>

                  <div className={styles.orderMeta}>
                    <div className={styles.metaItem}>
                      <span>Status:</span>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.metaItem}>
                      <span>Order Date:</span>
                      <span>{formatDate(order.requestTime)}</span>
                    </div>
                    {order.status === "Delivered" && (
                      <div className={styles.metaItem}>
                        <span>Delivery Date:</span>
                        <span>{formatDate(order.lastUpdateTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
