import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Enavbar from "../ecomponents/ENavbar";
import Footer from "../../components/footer";
import { sendOrderEmail } from "../../utils/sendOrderEmail";
import { v4 as uuidv4 } from "uuid";
import "./Checkout.css";
const Checkout = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let subtotal = 0;
    let shipping = 30.0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
    });

    const orderDetails = {
      customer_email: form.email.trim(),
      order_number: uuidv4(),
      shipping_cost: shipping,
      tax_amount: subtotal * 0.1,
      total_cost: Math.round(subtotal + shipping),
      orders: state.map((item) => ({
        name: item.name,
        price: item.price.toFixed(2),
        units: item.qty,
      })),
    };

    console.log("Order details being sent:", orderDetails);
    sendOrderEmail(orderDetails);
    navigate("/track-shipment");
  };

  const subtotal = state.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = state.reduce((acc, item) => acc + item.qty, 0);
  const shipping = 30.0;

  if (!state.length) {
    return (
      <>
        <Enavbar />
        <div className="empty-cart">
          <h4>No items in the cart</h4>
          <Link to="/" className="continue-shopping">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <div className="checkout">
    <div className="top-bar">
        <a href="/dashboard" className="back-arrow">← Back to Dashboard</a>
         <a href="/ecommerce/home">Home</a>
          <a href="/ecommerce/product">Products</a>
        <a href="/ecommerce/about-page">About</a>
        <a href="/ecommerce/contact-page">Contact Us</a>
      </div>
     
      <section className="checkout-container">
        <div className="checkout-row">
          {/* Order Summary */}
          <div className="order-summary">
            <h5>Order Summary</h5>
            <ul>
              <li>Products ({totalItems}) <span>${Math.round(subtotal)}</span></li>
              <li>Shipping <span>${shipping}</span></li>
              <li>Total Amount <span><strong>${Math.round(subtotal + shipping)}</strong></span></li>
            </ul>
          </div>

          {/* Billing Form */}
          <div className="billing-form">
            <h4>Billing Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Address 2 (Optional)</label>
                <input name="address2" value={form.address2} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Choose...</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Province</label>
                  <select name="state" value={form.state} onChange={handleChange} required>
                    <option value="">Choose...</option>
                     <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Balochistan">Balochistan</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            <option value="Azad Kashmir">Azad Kashmir</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Zip</label>
                  <input name="zip" value={form.zip} onChange={handleChange} required />
                </div>
              </div>

              <h4>Payment</h4>
              <div className="form-group">
                <label>Payment Method</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              <button type="submit" className="checkout-btn">Place Order</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default Checkout;
