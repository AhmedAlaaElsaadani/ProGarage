import React, { useContext, useEffect, useState } from "react";
import Heading from "../../Components/Ui/Heading/Heading";
import { authContext } from "../../Contexts/authContext";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";
import style from "./MyOrders.module.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getAllOrders(token);
        setOrders(response.data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return style.statusDelivered;
      case "pending":
        return style.statusPending;
      case "processing":
        return style.statusProcessing;
      case "cancelled":
        return style.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <section id="MyOrders">
      <Heading heading="My Orders" />
      <div className="container pt-3">
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
        ) : orders.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            You don't have any orders yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={style.ordersTableContainer}
          >
            <div className={style.tableHeader}>
              <div className={style.orderCount}>
                <span className={style.orderCountBadge}>{orders.length}</span>{" "}
                Orders
              </div>
            </div>
            <div className={style.tableWrapper}>
              <table className={style.ordersTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Invoice No.</th>
                    <th>Status</th>
                    <th>Buying Date</th>
                    <th>Total</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <td>{index + 1}</td>
                      <td>{order.invoiceNumber || `ORD-${order.id}`}</td>
                      <td>
                        <span
                          className={`${style.statusBadge} ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{formatDate(order.requestTime)}</td>
                      <td>{order.totalPrice.toFixed(2)} LE</td>
                      <td>
                        <button
                          className={style.detailsButton}
                          onClick={() =>
                            (window.location.href = `/my-orders/${order.id}`)
                          }
                        >
                          <i className="fa fa-info-circle"></i>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
