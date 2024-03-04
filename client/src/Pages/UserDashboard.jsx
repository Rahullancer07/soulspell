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
  // if (!auth.user || auth.user.isAdmin) {
  //   navigate("/login");
  //   return null; // Render nothing while navigating
  // }

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (addressId) => {
    console.log(addressId);
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

  useEffect(() => {
    if (auth.initialized) {
      // Redirect to login if user is not authenticated or is an admin
      if (!auth.user || auth.user.isAdmin) {
        navigate("/login");
      }
    }
    getAllAddress();
  }, [auth, navigate, isModalOpen]);

  useEffect(() => {
    getUserAddresses();
  }, [allAddress]);

  console.log(allAddress);

  return (
    <div className="w-full h-screen">
      <div className="w-full px-10 pt-10 flex flex-col gap-3">
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
