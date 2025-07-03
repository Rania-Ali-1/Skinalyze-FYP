import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import DashboardHome from "../Pages/DashboardHome";
import DermaDetection from "../Pages/DermaDetection";
import ExploreDerma from "../Pages/ExploreDerma";
import DoctorConsultation from "../Pages/DoctorConsultation";
import Ecomm from "../Pages/Ecomm";
import VideoChat from '../Pages/VideoChat'; // ✅ Correct path

// Ecommerce Pages
import Home from "../Efrontend/epages/Home";
// import Pro from "../Efrontend/epages/Pro";
import Product from "../Efrontend/epages/Product";
import AboutPage from "../Efrontend/epages/AboutPage";
import ContactPage from "../Efrontend/epages/ContactPage";
import Cart from "../Efrontend/epages/Cart";
import Checkout from "../Efrontend/epages/Checkout";
import PageNotFound from "../Efrontend/epages/PageNotFound";
import ProductDetail from "../Efrontend/epages/productdetail";

// Doctor Consult Page
import CHomePage from "../consultfrontend/cpages/ChomePage";

// ✅ Add Recommended Products Page
import RecommendationPage from "../Pages/RecommendationPage";

const AppRoutes = () => {
  console.log("Rendering Routes");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard with Nested Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="dashboard-home" element={<DashboardHome />} />
        <Route path="derma-detection" element={<DermaDetection />} />
        <Route path="recommended-products" element={<RecommendationPage />} />
        <Route path="explore-derma" element={<ExploreDerma />} />
        <Route path="doctor-consultation" element={<DoctorConsultation />} />
        <Route path="ecomm" element={<Ecomm />} />
      </Route>

      {/* Ecommerce Routes */}
      <Route path="/ecommerce/home" element={<Home />} />
      {/* <Route path="/ecommerce/pro" element={<Pro />} /> */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/ecommerce/product" element={<Product />} />
      <Route path="/ecommerce/about-page" element={<AboutPage />} />
      <Route path="/ecommerce/contact-page" element={<ContactPage />} />
      <Route path="/ecommerce/cart" element={<Cart />} />
      {/* <Route path="/ecommerce/checkout" element={<Checkout />} /> */}

      {/* Doctor Consultation */}
      <Route path="/doctorconsult/ChomePage" element={<CHomePage />} />
      {/* Other routes */}
      <Route path="/video-chat" element={<VideoChat />} />
      
      <Route path="/checkout" element={<Checkout/>} />

      

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;