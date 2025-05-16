import React, { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Filter from "../../Components/Filter/Filter";
import styles from "./Products.module.css";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    carType: "",
    carBrand: "",
    carModel: "",
    year: "",
    transmission: "",
    category: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // Fetch products (mock data for now)
  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockProducts = Array(18)
      .fill()
      .map((_, index) => ({
        id: index + 1,
        title: "Product 01",
        description: "Any Describyopm Here",
        price: 1600,
        year: 2024,
        transmission: "Automatic",
        trader: "Master Admin",
        traderId: "b2d4bec7-5072-4f3a-bdd0-7ab85a337ed3",
        brandId: 1,
        brand: "BMW",
        typeId: 1,
        type: "Hatchback",
        category: "AAAAAA",
        categoryId: 1,
        images: ["/a/s/d", "/t/y/u"],
      }));

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...products];

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        // This is just a placeholder for real filtering logic
        // In a real app, you'd have actual properties to filter on
        results = results.filter((product) => product[key] !== undefined);
      }
    });

    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, products]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // // Handle search input change
  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  // };

  // Handle filter changes
  const handleFilterChange = (filterObj) => {
    setFilters(filterObj);
    if (isMobile) {
      setShowFilterModal(false);
    }
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section id="Products" className={styles.products}>
      {/* <div className={styles.searchContainer}>
        <SearchInput onSearch={handleSearch} />
      </div> */}

      <div className={styles.mainContent + " container "}>
        <div className="row ">
          {/* Product grid */}
          <div className="container-fluid  col-md-12 col-lg-8">
            <div className={" row g-3"}>
              {currentProducts.map((product, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * idx > 1 ? 0.2 : 0.1 * idx,
                  }}
                  className="col-md-4 col-sm-6"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
              {/* Pagination */}
              <div
                className={
                  styles.pagination + " col-md-12 d-flex justify-content-center"
                }
              >
                <button
                  className={styles.paginationArrow}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      className={`${styles.pageNumber} ${
                        number === currentPage ? styles.activePage : ""
                      }`}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  className={styles.paginationArrow}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {/* Filter - shown normally on desktop, as a modal on mobile */}
          <div className="col-lg-3 p-3">
            <Filter filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </div>

      {/* Floating filter button for mobile */}
    </section>
  );
};

export default Products;
