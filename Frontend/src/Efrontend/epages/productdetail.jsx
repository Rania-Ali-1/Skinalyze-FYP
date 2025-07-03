import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";


const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);

  // If product is not passed, find it manually
  useEffect(() => {
    if (!product) {
      const allProducts = [...Moisturizer, ...Serum, ...Night_Creams, ...Cleanser, ...Toner];
      const foundProduct = allProducts.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, product]);

  if (!product) {
    console.log("Product not found.");
    return <p>No product details available.</p>;
  }
  

  return (
<>
    <style>
        {`
.product-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-title {
 justify-content: center;
 align-items: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
}

.product-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-image {
  flex-basis: 40%;
  margin: 10px;
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.product-info {
  flex-basis: 50%;
  margin: 10px;
}

.product-info h3 {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.product-info p {
  font-size: 16px;
  margin-bottom: 20px;
}

.product-info h5 {
  font-weight: bold;
  font-size: 16px;
  color: #666;
}
        `}
      </style>
      <h1>Product Details</h1>
    <div class="product-container">
     
  <h1 class="product-title text-center">{product.title}</h1>
  <div class="product-details">
    <div class="product-image">
      <img src={product.thumbnail} alt={product.title} class="img-fluid" />
    </div>
    <div class="product-info">
      <h3>Price: ${product.price}</h3>
      <p>{product.description}</p>
      <h5>Category: {product.category}</h5>
    </div>
  </div>
</div>

</>
  );
};

export default ProductDetail;
