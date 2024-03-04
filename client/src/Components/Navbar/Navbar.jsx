import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/auth.context";
import {
  AccountCircleIcon,
  CloseIcon,
  MenuIcon,
  ShoppingBagIcon
} from "../../Icons/Icons";
import transparentLogo from "../../Images/logo_transparent.png";

const Navbar = () => {
  const [sideBarMenuOpen, setSideBarMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState(null);
  const accountPath = auth.user
    ? auth.user.isAdmin
      ? "/account/admin"
      : "account/user"
    : "/login";

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAll-category");
      if (data?.success) {
        setCategories(data?.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="text-black bg-white fixed top-0 left-0 z-10 w-full shadow-sm  flex flex-col">
      <div className=" px-5 py-3 flex justify-center items-center md:justify-between">
        <div className="items-center w-40 justify-center hidden md:block"></div>
        <Link to="/">
          <img src={transparentLogo} alt="..." className="w-40 h-10" />
        </Link>
        <div className="md:flex items-center gap-5 w-40 justify-center hidden">
          <NavLink to={accountPath}>
            <AccountCircleIcon style={{ fontSize: "30px" }} />
          </NavLink>
          <NavLink to="/cart">
            <ShoppingBagIcon style={{ fontSize: "30px" }} />
          </NavLink>
        </div>

        <div
          className="fixed right-7 md:hidden"
          onClick={() => setSideBarMenuOpen(true)}
        >
          <MenuIcon />
        </div>
      </div>
      <div className="w-full items-center justify-between hidden md:block px-4 pb-2">
        <div className="flex flex-row justify-center mx-auto uppercase font-semibold gap-10 lg:gap-14 lg:text-lg">
          {categories?.map((category, index) => (
            <NavLink
              key={index}
              to={`/category/${category?.categoryName}`}
              className="cursor-pointer"
            >
              <span className="tracking-widest">{category?.categoryName}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {sideBarMenuOpen && (
        <div className="right-0 top-0 fixed bg-black w-4/5 h-screen z-10">
          <div
            className="flex items-center justify-end pr-5 pt-5 text-white"
            onClick={() => setSideBarMenuOpen(false)}
          >
            <CloseIcon />
          </div>
          <div className="mt-10">
            <ul className="flex flex-col gap-10 w-full px-10 text-white">
              {categories?.map((category, index) => (
                <NavLink
                  key={index}
                  to={`/category/${category?.categoryName}`}
                  className="cursor-pointer"
                >
                  <span>{category?.categoryName}</span>
                </NavLink>
              ))}
              <NavLink to={accountPath} className="cursor-pointer">
                <li className="flex justify-between">Account</li>
              </NavLink>
              <NavLink to="/cart" className="cursor-pointer">
                <li className="flex justify-between">Cart</li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
