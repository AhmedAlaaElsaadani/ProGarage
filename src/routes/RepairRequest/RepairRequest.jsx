import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import Textarea from "../../Components/Ui/Textarea/Textarea";
import { motion } from "framer-motion";
import style from "./RepairRequest.module.css";
import ApiManager from "../../Utilies/ApiManager";
import { authContext } from "../../Contexts/authContext";
import Swal from "sweetalert2";

export default function RepairRequest() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState({ flag: false, message: "" });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const { isRegistered, token } = useContext(authContext);

  // Request location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Update map URL when location changes
  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      setMapUrl(
        `https://www.openstreetmap.org/export/embed.html?bbox=${
          longitude - 0.01
        },${latitude - 0.01},${longitude + 0.01},${
          latitude + 0.01
        }&layer=mapnik&marker=${latitude},${longitude}`
      );
    }
  }, [userLocation]);

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError("");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Unable to get your location. Please try again or enter manually."
          );
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // Add the new image to the array
      setSelectedImages([...selectedImages, file]);

      // Create preview URL for the latest image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      // Add the new image to the array
      setSelectedImages([...selectedImages, file]);

      // Create preview URL for the latest image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImages([]);
    setImagePreview(null);
  };

  // Form validation schema
  const phoneRegax = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/;
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegax, "Invalid phone number format")
      .required("Phone number is required"),
    problemDescription: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Problem description is required"),
    locationDescription: Yup.string(),
  });

  // Form submission handler
  const submitRepairRequest = async (values) => {
    if (!isRegistered) {
      Swal.fire({
        title: "Please Register First",
        text: "You need to register before booking a repair.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setResponseFlag(true);

    try {
      // Prepare the parameters for the API call exactly as required by askForRepair
      const repairParams = {
        LocationLongitude: userLocation
          ? userLocation.longitude.toString()
          : "",
        LocationLatitude: userLocation ? userLocation.latitude.toString() : "",
        LocationDescription: values.locationDescription,
        PhoneNumber: values.phoneNumber,
        ProblemDescription: values.problemDescription,
        Images: selectedImages,
      };

      // Make the API call using the askForRepair method
      const response = await ApiManager.askForRepair(repairParams, token);

      console.log("Repair request response:", response);

      setResMessage({
        flag: true,
        message: "Your repair request has been submitted successfully!",
      });
      formik.resetForm();
      setSelectedImages([]);
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting repair request:", error);
      setResMessage({
        flag: false,
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setResponseFlag(false);
    }
  };

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      problemDescription: "",
      locationDescription: "",
    },
    validationSchema,
    onSubmit: submitRepairRequest,
  });

  return (
    <section
      className={`container ${style.repairRequestSection}`}
      id="repairRequest"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={style.repairRequestCard}
      >
        <h2 className={style.heading}>Get Your Vehicle Back on the Road!</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 mb-3">
              <FloatingInput
                inputType="tel"
                inputName="phoneNumber"
                inputText="Phone Number"
                defaultValue={formik.values.phoneNumber}
                icon="fa-phone"
                onChange={formik.handleChange}
                error={formik.errors.phoneNumber}
                touched={formik.touched.phoneNumber}
                animationFlag={true}
                disabled={responseFlag}
                idx={0}
              />
            </div>
          </div>

          <div className="mb-4">
            <Textarea
              myFormik={formik}
              inputName="problemDescription"
              inputText="Describe what happened with your vehicle"
              icon="fa-car"
              error={formik.errors.problemDescription}
              touched={formik.touched.problemDescription}
              onChange={formik.handleChange}
              defaultValue={formik.values.problemDescription}
              disabled={responseFlag}
              idx={1}
            />
          </div>
          /
          <div className="row mt-4 align-items-stretch">
            <div className="col-md-6 mb-4">
              <p className={style.sectionLabel}>
                Upload Photos of your problem
              </p>
              <div
                className={style.uploadArea}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("imageUpload").click()}
              >
                {imagePreview ? (
                  <div className={style.previewContainer}>
                    <img
                      src={imagePreview}
                      alt="Problem Preview"
                      className={style.imagePreview}
                    />
                    <div className={style.imageCount}>
                      {selectedImages.length}{" "}
                      {selectedImages.length === 1 ? "image" : "images"}{" "}
                      selected
                    </div>
                    <button
                      type="button"
                      className={style.removeImageBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={style.uploadIcon}>
                      <i className="fa-solid fa-upload"></i>
                    </div>
                    <p className={style.uploadText}>
                      Click to upload or drag and drop
                    </p>
                    <p className={style.uploadLimit}>(Max file size: 25 MB)</p>
                  </>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={style.fileInput}
                />
              </div>
            </div>

            <div className="col-md-6 mb-4 d-flex flex-column">
              <p className={style.sectionLabel}>Choose your location</p>
              <div className={style.mapContainer + " flex-grow-1"}>
                {userLocation ? (
                  <>
                    <iframe
                      src={mapUrl}
                      title="Your Location"
                      className={style.locationMap}
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                    <div className={style.locationInfo}>
                      <p>
                        <small>
                          Coordinates: {userLocation.latitude.toFixed(6)},{" "}
                          {userLocation.longitude.toFixed(6)}
                        </small>
                      </p>
                      <button
                        type="button"
                        className={
                          style.clearLocationBtn ||
                          "btn btn-sm btn-outline-secondary mt-1"
                        }
                        onClick={() => setUserLocation(null)}
                      >
                        <i className="fa-solid fa-xmark me-1"></i>
                        Clear Location
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={style.locationPlaceholder}>
                    <button
                      type="button"
                      className={style.getLocationBtn}
                      onClick={getUserLocation}
                    >
                      <i className="fa-solid fa-location-dot me-2"></i>
                      Share My Location
                    </button>
                    {locationError && (
                      <p className={style.locationError}>{locationError}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-web btn-web-primary mt-4 w-100"
            disabled={responseFlag}
          >
            {responseFlag ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </button>

          {resMessage.message && (
            <div
              className={`mt-3 ${
                resMessage.flag ? style.successMessage : style.errorMessage
              }`}
            >
              {resMessage.message}
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
}
