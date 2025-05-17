import React, { useContext, useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { IsMobileContext } from "../../Contexts/IsMobileContext";
import { motion } from "framer-motion";

const Filter = ({ filters, onFilterChange, brands, types, categories }) => {
  // Local state to manage filter form
  const [localFilters, setLocalFilters] = useState({
    TypeId: filters.TypeId || "",
    BrandId: filters.BrandId || "",
    Year: filters.Year || "",
    Transmission: filters.Transmission || "",
    CategoryId: filters.CategoryId || "",
  });

  const { isMobile } = useContext(IsMobileContext);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters({
      TypeId: filters.TypeId || "",
      BrandId: filters.BrandId || "",
      Year: filters.Year || "",
      Transmission: filters.Transmission || "",
      CategoryId: filters.CategoryId || "",
    });
  }, [filters]);

  // Options for year and transmission dropdowns (these don't come from API)
  const yearOptions = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
  ];
  const transmissionOptions = ["Automatic", "Manual", "CVT", "Semi-automatic"];

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
    if (isMobile) {
      setShowFilterModal(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    const emptyFilters = {
      TypeId: "",
      BrandId: "",
      Year: "",
      Transmission: "",
      CategoryId: "",
    };

    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  // Toggle filter modal for mobile
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  // Render select dropdown
  const renderSelect = (
    name,
    label,
    options,
    valueKey = "id",
    labelKey = "name"
  ) => (
    <div className={styles.filterItem}>
      <select
        className={styles.filterSelect}
        value={localFilters[name]}
        onChange={(e) => handleFilterChange(name, e.target.value)}
      >
        <option value="">{label}</option>
        {Array.isArray(options) &&
          options.map((option) => {
            // Handle both array of objects and array of strings
            const value =
              typeof option === "object" ? option[valueKey] : option;
            const text = typeof option === "object" ? option[labelKey] : option;

            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
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
              className="btn btn-danger rounded-5 fs-5 d-flex justify-content-center align-items-center position-absolute top-0 end-0 me-2 mt-2"
              onClick={toggleFilterModal}
              style={{
                width: "30px",
                height: "30px",
              }}
            >
              X
            </button>
          )}
          <h2 className={styles.filterTitle}>Filters</h2>

          <div className={styles.filterList}>
            {/* Using real data from the API */}
            {renderSelect("TypeId", "Car Type", types)}
            {renderSelect("BrandId", "Car Brand", brands)}
            {renderSelect("CategoryId", "Category", categories, "id", "title")}

            {/* Static options */}
            {renderSelect("Year", "Year", yearOptions, null, null)}
            {renderSelect(
              "Transmission",
              "Transmission",
              transmissionOptions,
              null,
              null
            )}
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
