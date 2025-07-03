// const response = await fetch("https://skinalyze-product-api-c3hugqa9b9bzhycq.eastus2-01.azurewebsites.net/api/products");
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Redux/Action";
import "./Product.css";
import homeImage from "../assets/collection-skin-care-products-black-background_866663-2776.avif";
import  ENavbar  from "../ecomponents/ENavbar";

const ProductPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDocId, setLastDocId] = useState(null); // Track the last document ID for pagination
  const [hasMore, setHasMore] = useState(true); // To check if there are more products to load

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // const url = `http://localhost:4000/api/products?page=1&lastDocId=${lastDocId || ''}&pageSize=10`;
      const url = `https://skinalyze-product-api-c3hugqa9b9bzhycq.eastus2-01.azurewebsites.net/api/products?page=1&lastDocId=${lastDocId || ''}&pageSize=10`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      if (!Array.isArray(data.products)) throw new Error("Invalid products format");

      // Combine newly fetched products with existing ones
      setProducts((prev) => {
        const updatedProducts = [...prev, ...data.products];
        localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update the cached products
        localStorage.setItem("lastDocId", data.lastDocId); // Update the lastDocId for next fetch
        return updatedProducts;
      });

      setLastDocId(data.lastDocId);
      setHasMore(!!data.lastDocId); // If lastDocId exists, there are more products to load
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    if (hasMore && !loading) {
      fetchProducts(); // Fetch more products when the button is clicked
    }
  };

  useEffect(() => {
    // Check if products are already in localStorage and load them
    const cachedProducts = localStorage.getItem("products");
    const cachedLastDocId = localStorage.getItem("lastDocId");

    if (cachedProducts && cachedLastDocId) {
      setProducts(JSON.parse(cachedProducts));
      setLastDocId(cachedLastDocId);
      setHasMore(!!cachedLastDocId);
    } else {
      fetchProducts(); // If no cached products, fetch them from the server
    }
  }, []);  // Run once on component mount

  return (
    <div>
      {/* Top Navigation */}
      <ENavbar />
      {/* Hero Image */}
      <div className="image">
        <img src={homeImage} alt="Hero" className="ep-image" />
      </div>

      {/* Products Header */}
      <div className="eh">
        <h1>Products List</h1>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product, idx) => (
            <div className="product-card" key={idx}>
              <img src={product.url} alt={product.name} className="product-img" />
              <div className="product-actions">
                <h4>{product.name}</h4>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Label:</strong> {product.label}</p>
                <p><strong>Price:</strong> Rs. {product.price}</p>
                <p><strong>Key Ingredients:</strong> {product.key_ingredients}</p>
                <button className="add-btn" onClick={() => dispatch(addCart(product))}>
                  Add to Cart
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="load-more">
          <button onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
