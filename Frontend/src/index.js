import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./Efrontend/Redux/store"; // Import the store
import './fonts.js';

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>  {/* Wrap the BrowserRouter and App with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
