import React from "react";
import { useAuth } from "../Context/auth.context.js";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
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

  // Redirect to login if user is not authenticated
  if (!auth.user || auth.user.isAdmin) {
    navigate("/login");
    return null; // Render nothing while navigating
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full px-10 pt-10 flex flex-col gap-3">
        <span className="uppercase tracking-wider flex justify-start font-semibold text-2xl">
          My Account
        </span>
        <span>Welcome Back , {auth.user?.firstName} !!</span>
      </div>
      <div className="w-full px-10 pt-10 flex flex-col md:flex-row">
        <div className="w-9/12 flex flex-col gap-3">
          <span className="uppercase tracking-wider font-semibold">
            My Orders
          </span>
          <span className="border border-slate-300 flex justify-start w-11/12"></span>
        </div>
        <div className="w-3/12 flex flex-col gap-3">
          <span className="uppercase tracking-wider font-semibold">
            Primary Address
          </span>
          <span className="border border-slate-300 flex justify-start w-11/12"></span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-10">
        <div
          className="min-w-40 flex items-center justify-center h-10 bg-white text-black border border-slate-300 hover:bg-black hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
