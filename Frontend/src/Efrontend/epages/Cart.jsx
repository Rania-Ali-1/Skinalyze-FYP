import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../Redux/Action";
import { Link } from "react-router-dom";
import ENavbar from "../ecomponents/ENavbar";
import "./Cart.css";



const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addCart(product));
  };

  const handleRemove = (product) => {
    dispatch(delCart(product));
  };

  const EmptyCart = () => (
    <div className="empty-cart">
      <h4>Your Cart is Empty</h4>
      <Link to="/" className="checkout-btn">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
          <ENavbar />

          {/* Cart Content */}
          <section className="cart-container-inner">
            <div className="cart-row">
              <div className="cart-items">
                <h5>Item List</h5>
                {cartItems.map((item) => (
                  <div key={item.name} className="cart-item">
                    <img src={item.url} alt={item.name} />
                    <div className="cart-details">
                      <p><strong>{item.name}</strong></p>
                      <p>Price: ${item.price}</p>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => handleRemove(item)}>-</button>
                      <p className="quantity-display">{item.qty}</p>
                      <button className="quantity-btn" onClick={() => handleAdd(item)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <h5>Order Summary</h5>
                <ul>
                  <li>Products ({totalItems}) <span>${Math.round(subtotal)}</span></li>
                  <li>Shipping <span>${shipping}</span></li>
                  <li>Total Amount <span><strong>${Math.round(subtotal + shipping)}</strong></span></li>
                </ul>
                <Link to="/checkout" className="checkout-btn">Go to Checkout</Link>
              </div>
            </div>
          </section>
     
      </>
    );
  };

  return (
    <div className="cart-container">
      <hr />
      {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
    </div>
  );
};

export default Cart;
