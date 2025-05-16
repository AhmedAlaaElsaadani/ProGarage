import React, { useContext, useState } from "react";
import styles from "./Filter.module.css";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { motion } from "framer-motion";

const Filter = ({ filters, onFilterChange }) => {
  // Local state to manage filter form
  const [localFilters, setLocalFilters] = useState(filters);
  const { isMobile } = useContext(IsMobileContext);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Options for dropdown filters
  const filterOptions = {
    carType: ["Sedan", "SUV", "Hatchback", "Truck", "Van"],
    carBrand: [
      "BMW",
      "Mercedes",
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Audi",
      "Bosch",
    ],
    carModel: [
      "Model S",
      "Model X",
      "Corolla",
      "Civic",
      "F-150",
      "Silverado",
      "A4",
    ],
    year: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"],
    transmission: ["Automatic", "Manual", "CVT", "Semi-automatic"],
    category: [
      "Lights",
      "Engine",
      "Brakes",
      "Suspension",
      "Electrical",
      "Body Parts",
    ],
  };

  // Handle changes to any filter field
  const handleFilterChange = (field, value) => {
    const updatedFilters = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(updatedFilters);
  };

  // Apply all filters
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const emptyFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});

    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  // Toggle filter modal for mobile
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  // Render select dropdown
  const renderSelect = (name, label, options) => (
    <div className={styles.filterItem}>
      <select
        className={styles.filterSelect}
        value={localFilters[name]}
        onChange={(e) => handleFilterChange(name, e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={styles.selectArrow}>
        <i className="fa fa-chevron-down"></i>
      </div>
    </div>
  );
  return (
    <>
      {isMobile && (
        <button
          className={
            styles.floatingFilterBtn +
            " btn-web btn-web-outline-primary py-2 px-3 "
          }
          onClick={toggleFilterModal}
        >
          <i className="fa fa-filter"></i>
        </button>
      )}
      {(!isMobile || showFilterModal) && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={styles.filterContainer}
        >
          {isMobile && (
            <button
              className="btn btn-danger rounded-5 fs-5 "
              onClick={toggleFilterModal}
            >
              &times;
            </button>
          )}
          <h2 className={styles.filterTitle}>Filters</h2>

          <div className={styles.filterList}>
            {renderSelect("carType", "Car Type", filterOptions.carType)}
            {renderSelect("carBrand", "Car Brand", filterOptions.carBrand)}
            {renderSelect("carModel", "Car Model", filterOptions.carModel)}
            {renderSelect("year", "Year", filterOptions.year)}
            {renderSelect(
              "transmission",
              "Transmission",
              filterOptions.transmission
            )}
            {renderSelect("category", "Category", filterOptions.category)}
          </div>

          <div className={styles.filterActions}>
            <button
              className={styles.clearFilterBtn}
              onClick={handleClearFilters}
            >
              Clear
            </button>
            <button
              className={styles.applyFilterBtn}
              onClick={handleApplyFilters}
            >
              Search
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Filter;
