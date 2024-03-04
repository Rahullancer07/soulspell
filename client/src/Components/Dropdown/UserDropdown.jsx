import React, { useState } from "react";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../Icons/Icons";

const UserDropdown = ({ size, selectedSize ,setSelectedSize }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSizeChange = (sizeValue, e) => {
    e.stopPropagation();
    setSelectedSize(sizeValue);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };
  return (
    <div className="w-full" onClick={() => setDropdownOpen((prev) => !prev)}>
      <div className="flex w-full justify-between border-2 border-slate-300 items-center px-3 py-3 gap-2 cursor-pointer">
      <span>{selectedSize ? selectedSize?.size : "Select Size"}</span>
        {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      {dropdownOpen && (
        <div className="border-2 border-slate-300 w-full mt-3 h-48 overflow-y-auto">
          <div className="flex flex-col items-center text-md">
            {size?.map((sizeValue) => (
              <div
                className="hover:bg-slate-300 w-full h-10 flex items-center justify-center"
                key={sizeValue?._id}
                value={sizeValue?.size}
                onClick={(e) => handleSizeChange(sizeValue, e)}
              >
                {sizeValue?.size}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
