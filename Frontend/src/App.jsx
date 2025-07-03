import React from "react";
import { UserProvider } from "./UserContext"; // Make sure this path is correct
import AppRoutes from "./Routes/approutes"; // Your routing component
import "./App.css";

const App = () => {
  return (
    <UserProvider> {/* Wrap everything inside UserProvider */}
      <div>
        <AppRoutes /> {/* All your routes will be here */}
        <div id="ecommerce-root"></div> {/* The root container */}
      </div>
    </UserProvider>
  );
};

export default App;
