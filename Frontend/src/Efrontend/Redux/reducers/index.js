// src/Efrontend/Redux/reducers/index.js
import handleCart from './handleCart';
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  cart: handleCart,  // Wrap handleCart in an object with the key as "cart"
});

export default rootReducers;
