import React, { useState, useEffect, useContext } from "react";
import Heading from "../../Components/Ui/Heading/Heading";
import { authContext } from "../../Contexts/authContext";
import ApiManager from "../../Utilies/ApiManager";
import styles from "./MyRepairRequests.module.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyRepairRequests = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const { token } = useContext(authContext);

  const fetchRepairRequests = async () => {
    try {
      setLoading(true);

      const response = await ApiManager.getRepairRequests(token);
      setRepairRequests(response.data.data || []);
    } catch (err) {
      console.error("Error fetching repair requests:", err);
      if (err.response.data.code == 404) {
        // no repair requests founded
        setRepairRequests([]);
      } else
        setError("Failed to load repair requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairRequests();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-GB") +
      " " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.statusCompleted;
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

  const handleDelete = async (id) => {
    Swal.fire("Are you sure?", "You won't be able to revert this!", "warning", {
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setCancelId(id);
          await ApiManager.cancelRepairRequest(token, id);
          // Refresh the list after deletion
          fetchRepairRequests();
        } catch (err) {
          console.error("Error cancelId repair request:", err);
          Swal.fire(
            "Error",
            "Failed to delete repair request. Please try again later.",
            "error"
          );
        } finally {
          setCancelId(null);
        }
      }
    });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "N/A";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <section id="RepairRequests">
      <Heading heading="My Repair Requests" />
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
        ) : repairRequests.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            You don't have any repair requests yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.requestsTableContainer}
          >
            <div className={styles.tableHeader}>
              <div className={styles.requestCount}>
                <span className={styles.requestCountBadge}>
                  {repairRequests.length}
                </span>{" "}
                Repair Requests
              </div>
              <Link className={styles.newRequestBtn} to="/repairRequest">
                New Request
              </Link>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.requestsTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Phone</th>
                    <th>Problem</th>
                    <th>Status</th>
                    <th>Request Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {repairRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <td className={styles.idCell}>
                        {request.id.substring(0, 8)}...
                      </td>
                      <td
                        className={styles.locationCell}
                        title={request.locationDescription}
                      >
                        {truncateText(request.locationDescription, 30)}
                      </td>
                      <td>{request.phoneNumber}</td>
                      <td
                        className={styles.problemCell}
                        title={request.problemDescription}
                      >
                        {truncateText(request.problemDescription, 30)}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>{formatDate(request.requestTime)}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          {request.status.toLowerCase() !== "completed" &&
                            request.status.toLowerCase() !== "canceled" && (
                              <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(request.id)}
                                disabled={cancelId === request.id}
                                title="Cancel Request"
                              >
                                {cancelId === request.id ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  <i className="fa-solid fa-ban"></i>
                                )}
                              </button>
                            )}
                        </div>
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

export default MyRepairRequests;
