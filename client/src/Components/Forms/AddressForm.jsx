import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/auth.context";
import axios from "axios";

const AddressFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedAddress,
  setSelectedAddress,
}) => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(
    selectedAddress ? selectedAddress?.name : ""
  );
  const [phone, setPhone] = useState(
    selectedAddress ? selectedAddress.phone : ""
  );
  const [address1, setAddress1] = useState(
    selectedAddress ? selectedAddress.address1 : ""
  );
  const [address2, setAddress2] = useState(
    selectedAddress ? selectedAddress.address2 : ""
  );
  const [city, setCity] = useState(selectedAddress ? selectedAddress.city : "");
  const [pinCode, setPinCode] = useState(
    selectedAddress ? selectedAddress.pinCode : ""
  );
  const [state, setState] = useState(
    selectedAddress ? selectedAddress.state : ""
  );
  const [country, setCountry] = useState(
    selectedAddress ? selectedAddress.country : ""
  );
  const phonePattern = /^\d{10}$/; // Matches a 10-digit number
  const pinCodePattern = /^\d{6}$/; // Matches a 6-digit number

  useEffect(() => {
    if (selectedAddress) {
      setName(selectedAddress.name || "");
      setPhone(selectedAddress.phone || "");
      setAddress1(selectedAddress.address1 || "");
      setAddress2(selectedAddress.address2 || "");
      setCity(selectedAddress.city || "");
      setPinCode(selectedAddress.pinCode || "");
      setState(selectedAddress.state || "");
      setCountry(selectedAddress.country || "");
    }
  }, [selectedAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    if (
      !name ||
      !phone ||
      !address1 ||
      !pinCode ||
      !city ||
      !state ||
      !country
    ) {
      // If any required field is empty, display an error message
      toast.error("Please fill in all required fields");
      return;
    }
    // Validate phone number format
    if (!phonePattern.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    // Validate pin code format
    if (!pinCodePattern.test(pinCode)) {
      toast.error("Please enter a valid 6-digit pin code");
      return;
    }

    try {
      const postData = {
        name: name,
        phone: phone,
        address1: address1,
        address2: address2,
        pinCode: pinCode,
        city: city,
        state: state,
        country: country,
        userId: auth.user.id,
      };
      
      if (selectedAddress) {
        postData.addressId = selectedAddress._id;
      }

      const { data } = await axios.post(
        `/api/v1/address/${
          selectedAddress ? "updateAddress" : "addAddress"
        }`,
        postData
      );
      console.log(data);
      if (data?.success) {
        toast.success(`Address ${selectedAddress ? "updated" : "added"}`);
        setIsModalOpen(false);
        setName("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setState("");
        setCountry("");
        setPinCode("");
        setPhone("");
        setSelectedAddress(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full flex items-center justify-center ${
        isModalOpen ? "bg-gray-800 bg-opacity-50" : "hidden"
      }`}
    >
      <div className="bg-white p-8 shadow-lg w-2/5 h-3/4 overflow-auto">
        <span className="text-lg md:text-2xl font-semibold uppercase tracking-wider">
          Add Address
        </span>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 w-full">
              <div className="bg-white py-5">
                <div className="border border-slate-300 flex flex-col bg-white px-5 py-5">
                  {/* Name  */}
                  <label htmlFor="name" className=" mb-1">
                    Name
                  </label>
                  <input
                    placeholder="Name"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* Phone  */}
                  <label htmlFor="phone" className=" mb-1 mt-3">
                    Phone
                  </label>
                  <input
                    placeholder="Enter Phone Number"
                    type="tel"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                  />
                  {/* Address 1  */}
                  <label htmlFor="address1" className=" mb-1 mt-3">
                    Address 1
                  </label>
                  <input
                    placeholder="Enter Address 1"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  {/* Address 2  */}
                  <label htmlFor="address2" className=" mb-1 mt-3">
                    Address 2
                  </label>
                  <input
                    placeholder="Enter Address 2"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  {/* City  */}
                  <label htmlFor="city" className=" mb-1 mt-3">
                    City
                  </label>
                  <input
                    placeholder="Enter city"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {/* Pincode  */}
                  <label htmlFor="pinCode" className=" mb-1 mt-3">
                    Pincode
                  </label>
                  <input
                    placeholder="Enter pinCode"
                    type="number"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    pattern="[0-9]{6}"
                  />
                  {/* State  */}
                  <label htmlFor="state" className=" mb-1 mt-3">
                    State
                  </label>
                  <input
                    placeholder="Enter State"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  {/* Country  */}
                  <label htmlFor="country" className=" mb-1 mt-3">
                    Country
                  </label>
                  <input
                    placeholder="Enter Country"
                    type="text"
                    required
                    className="border border-slate-300 px-3 py-2"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <input
                  type="submit"
                  onClick={handleSubmit}
                  className="border bg-black h-10 text-white hover:bg-white hover:text-black hover:border-slate-300"
                  value={selectedAddress ? "Update address" : "Add address"}
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-slate-700 bg-white-400 h-10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
