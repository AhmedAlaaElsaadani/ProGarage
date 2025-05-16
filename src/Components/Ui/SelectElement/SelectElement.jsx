import { motion } from "framer-motion";
import React, { useState, useRef, useEffect, useMemo } from "react";
import style from "./SelectElement.module.css";

export default function SelectElement({
  selectName,
  selectTransition,
  icon,
  options,
  myFormik,
  idx,
  searchFlag = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Memoize filtered options to prevent unnecessary re-renders
  const filteredOptions = useMemo(() => {
    if (!searchFlag || !searchTerm.trim()) return options;
    return options.filter((option) =>
      option.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchFlag]);

  // Get the currently selected option text - memoized
  const selectedText = useMemo(() => {
    if (!myFormik.values[selectName]) return "";
    const selectedOption = options.find(
      (opt) => opt.value === myFormik.values[selectName]
    );
    return selectedOption ? selectedOption.key : "";
  }, [myFormik.values, selectName, options]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchFlag && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 10);
    }
  }, [isOpen, searchFlag]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "Tab":
          if (!searchFlag) {
            setIsOpen(false);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, searchFlag]);

  // Reset search when closing dropdown
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Handle option selection
  const handleOptionSelect = (option) => {
    myFormik.setFieldValue(selectName, option.value);
    setIsOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
        className={`${style.selectContainer} mb-3 ${
          isOpen ? style.active : ""
        }`}
        ref={dropdownRef}
      >
        <label htmlFor={selectName}>
          <i className={`fa-solid ${icon}`}></i>
        </label>

        <div className={style.selectBox}>
          {/* Hidden actual select for formik integration */}
          <select
            id={selectName}
            name={selectName}
            onChange={myFormik.handleChange}
            value={myFormik.values[selectName]}
            style={{ display: "none" }}
            aria-hidden="true"
          >
            <option value="">{selectTransition}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.key}
              </option>
            ))}
          </select>

          {/* Accessible custom dropdown */}
          <div
            className={`${style.customSelect} ${isOpen ? style.open : ""}`}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={`${selectName}-label`}
          >
            <div
              className={style.selectedOption}
              onClick={toggleDropdown}
              data-placeholder={selectTransition}
              id={`${selectName}-label`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleDropdown();
                }
              }}
            >
              {selectedText || selectTransition}
            </div>

            {isOpen && (
              <div className={style.dropdownMenu}>
                {searchFlag && (
                  <div className={style.searchContainer}>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={`${"Search"} ${selectTransition.toLowerCase()}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={style.searchInput}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                <div className={style.optionsList} role="listbox">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`${style.option} ${
                          option.value === myFormik.values[selectName]
                            ? style.selected
                            : ""
                        }`}
                        onClick={() => handleOptionSelect(option)}
                        role="option"
                        aria-selected={
                          option.value === myFormik.values[selectName]
                        }
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleOptionSelect(option);
                          }
                        }}
                      >
                        {option.key}
                      </div>
                    ))
                  ) : (
                    <div className={style.noResults}>No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {myFormik.errors[selectName] && myFormik.touched[selectName] && (
        <div className="text-center text-danger" aria-live="polite">
          {myFormik.errors[selectName]}
        </div>
      )}
    </>
  );
}
