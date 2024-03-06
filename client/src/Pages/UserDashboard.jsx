import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/auth.context.js";
import { useNavigate } from "react-router-dom";
import AddressForm from "../Components/Forms/AddressForm.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [allAddress, setAllAddress] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState(null);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login"); // Redirect to login after logout
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { data } = await axios.delete("/api/v1/address/deleteAddress", {
        data: { addressId: addressId },
      });
      if (data?.success) {
        toast.success("Address deleted successfully");
        getAllAddress();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting address");
    }
  };

  const getAllAddress = async () => {
    try {
      const { data } = await axios.get("/api/v1/address/getAll-address");
      if (data?.success) {
        setAllAddress(data?.addresses);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products");
    }
  };

  const getUserAddresses = () => {
    if (auth?.user) {
      const userId = auth.user.id;
      const userAllAddress = allAddress?.filter(
        (address) => address.userId === userId
      );
      setUserAddresses(userAllAddress);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/orders/getOrders");
      if (data?.success) {
        setAllOrders(data?.allOrders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting orders");
    }
  };

  const getUserOrders = () => {
    if (auth?.user) {
      const userId = auth.user.id;
      const userOrders = allOrders?.filter((order) => order.userId === userId);
      setUserOrders(userOrders);
    }
  };

  useEffect(() => {
    if (auth.initialized) {
      // Redirect to login if user is not authenticated or is an admin
      if (!auth.user || auth.user.isAdmin) {
        navigate("/login");
      }
    }
    getAllAddress();
    getOrders();
  }, [auth, navigate, isModalOpen]);

  useEffect(() => {
    getUserAddresses();
  }, [allAddress]);

  useEffect(() => {
    getUserOrders();
  }, [allOrders]);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full px-10 pt-12 flex flex-col gap-3">
        <span className="uppercase tracking-wider flex justify-start font-semibold text-2xl">
          My Account
        </span>
        <span>Welcome Back , {auth.user?.firstName} !!</span>
      </div>
      <div className="w-full px-10 pt-10 flex flex-col md:flex-row gap-10 md:gap-0">
        <div className="w-full md:w-9/12 flex flex-col gap-3">
          <span className="uppercase tracking-wider font-semibold">
            My Orders
          </span>
          <span className="border border-slate-300 flex justify-start w-11/12"></span>
          <div className="w-11/12">
            {userOrders?.map((order, index) => {
              return (
                <div className="bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Order #{index}</h2>
                    <span className="text-blue-500">{order.status}</span>
                  </div>
                  {order.orderItems.map((orderItem) => (
                    <div className="flex items-center mb-4">
                      <img
                        src={orderItem.productId.images[0]}
                        alt="Product Image"
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-gray-800 font-medium">
                          {orderItem.productId.name}
                        </h3>
                        <p className="text-gray-600">Size: {orderItem.size}</p>
                        <p className="text-gray-600">
                          Quantity: {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end items-center gap-5">
                    <p className="text-gray-600">Order Total:</p>
                    <p className="text-gray-800 font-semibold">
                      {order.orderTotal.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <span className="border border-slate-300 flex justify-start w-full mt-5"></span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-3/12 flex flex-col gap-3">
          <span className="uppercase tracking-wider font-semibold">
            Primary Address
          </span>
          <span className="border border-slate-300 flex justify-start w-11/12"></span>
          <div>
            {userAddresses.map((userAddress) => {
              const combinedStringAddress = [
                userAddress?.address1,
                userAddress?.address2,
                userAddress?.pinCode,
                userAddress?.city,
                userAddress?.state,
                userAddress?.country,
              ].join(", ");
              return (
                <div className="flex flex-col gap-3" key={userAddress?._id}>
                  <span>{combinedStringAddress}</span>
                  <div className="flex gap-10">
                    <button
                      className="underline underline-offset-8"
                      onClick={() => handleEditAddress(userAddress)}
                    >
                      Edit
                    </button>
                    <button
                      className="underline underline-offset-8"
                      onClick={() => handleDeleteAddress(userAddress._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <span className="border border-slate-300 flex justify-start w-11/12"></span>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-slate-300 h-10 bg-black text-white hover:text-black hover:bg-white w-3/5"
          >
            Add Address
          </button>
          <AddressForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
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
