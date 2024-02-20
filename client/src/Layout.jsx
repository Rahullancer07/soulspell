import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer autoClose={2000} theme="dark" />
      <Navbar />
      <div className="mt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
