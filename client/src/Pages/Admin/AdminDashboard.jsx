import React, { useState } from "react";
import { useAuth } from "../../Context/auth.context";
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { CloseIcon, MenuIcon } from "../../Icons/Icons";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login"); // Redirect to login after logout
  };

  // Redirect to login if user is not authenticated or not an admin
  if (!auth.user || !auth.user.isAdmin) {
    navigate("/login");
    return null; // Render nothing while navigating
  }

  // Render admin dashboard
  return (
    <div className="w-full h-screen lg:flex lg:flex-row">
      {/* Navigation bar on large screens */}
      <div className="w-1/5 bg-black text-white h-full hidden lg:block">
        <div className="flex flex-col items-center md:gap-2 uppercase font-semibold py-10 w-full px-2">
          <NavLink
            to="./analytics"
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
          >
            Analytics
          </NavLink>
          <NavLink
            to="./create-category"
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
          >
            Create Category
          </NavLink>
          <NavLink
            to="./create-product"
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
          >
            Create Product
          </NavLink>
          <NavLink
            to="./users"
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
          >
            Users
          </NavLink>
          <NavLink
            to="./orders"
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
          >
            Orders
          </NavLink>
          <NavLink
            className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </div>
      </div>
      {/* Navigation bar on small screens */}
      {!isNavbarOpen && (
        <div
          className="w-full h-14 border border-slate-600 bg-black flex items-center lg:hidden"
          onClick={() => setIsNavbarOpen(true)}
        >
          <MenuIcon style={{ color: "white", marginLeft: "10px" }} />
        </div>
      )}
      {isNavbarOpen && (
        <div className="w-3/5 h-screen bg-black">
          <div
            className="flex items-center justify-end pr-5 pt-5 text-white"
            onClick={() => setIsNavbarOpen(false)}
          >
            <CloseIcon />
          </div>
          <div className="text-white px-3 py-5 text-lg">
            <NavLink
              to="./analytics"
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            >
              Analytics
            </NavLink>
            <NavLink
              to="./create-category"
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            >
              Create Category
            </NavLink>
            <NavLink
              to="./create-product"
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            >
              Create Product
            </NavLink>
            <NavLink
              to="./users"
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            >
              Users
            </NavLink>
            <NavLink
              to="./orders"
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
            >
              Orders
            </NavLink>
            <NavLink
              className="hover:bg-slate-700 w-full flex items-center justify-start px-3 rounded-md h-10"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </div>
        </div>
      )}
      <div className="lg:w-4/5 h-screen bg-yellow-100">
          <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;
