import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Filter from "../../Components/Filter/Filter";
import styles from "./Products.module.css";
import { motion } from "framer-motion";
import ApiManager from "../../Utilies/ApiManager"; // Make sure this path is correct
import { authContext } from "../../Contexts/authContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isRegistered } = useContext(authContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;

  // Filter state
  const [filters, setFilters] = useState({
    TypeId: "",
    BrandId: "",
    Year: "",
    Transmission: "",
    CategoryId: "",
    PageIndex: 1,
    PageSize: productsPerPage,
  });

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Get the auth token - adjust based on your auth implementation

        // Fetch filter options data
        const [brandsResponse, typesResponse, categoriesResponse] =
          await Promise.all([
            ApiManager.getBrands(token),
            ApiManager.getTypes(token),
            ApiManager.getCategories(token),
          ]);

        setBrands(brandsResponse.data.data || []);
        setTypes(typesResponse.data.data || []);
        setCategories(categoriesResponse.data.data || []);

        // Initial product fetch
        await fetchProducts(token);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products based on current filters
  const fetchProducts = async (token) => {
    try {
      setLoading(true);
      const response = await ApiManager.getProducts(
        {
          ...filters,
          PageIndex: currentPage,
        },
        token
      );

      const { data } = response.data;

      setProducts(data.data || []);

      if (data.count) {
        setTotalItems(data.count || 0);
        setTotalPages(data.count / data.pageSize + 1 || 1);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Update products when filters or pagination changes
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    fetchProducts(token);
  }, [filters, currentPage]);

  // Handle filter changes
  const handleFilterChange = (filterObj) => {
    setFilters({
      ...filters,
      ...filterObj,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="Products" className={styles.products}>
      <div className={styles.mainContent + " container "}>
        <div className="row ">
          {/* Filter - shown normally on desktop, as a modal on mobile */}
          <div className="col-lg-3 p-3">
            <Filter
              filters={filters}
              onFilterChange={handleFilterChange}
              brands={brands}
              types={types}
              categories={categories}
            />
          </div>

          {/* Product grid */}
          <div className="container-fluid col-md-12 col-lg-8">
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
            ) : products.length === 0 ? (
              <div className="alert alert-info" role="alert">
                No products found matching your criteria.
              </div>
            ) : (
              <div className="row g-3">
                {products.map((product, idx) => (
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
                {totalPages > 1 && (
                  <div
                    className={
                      styles.pagination +
                      " col-md-12 d-flex justify-content-center"
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
