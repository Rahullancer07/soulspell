import React, { useEffect, useState } from "react";
import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../Icons/Icons";
import axios from "axios";
import { toast } from "react-toastify";

const Admindropdown = ({ categories, category, setCategory }) => {
  const getCategory = async () => {
    try {
      const { data } = await axios.post("/api/v1/category/getOne-category", {
        categoryId: category,
      });
      if (data?.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products");
    }
  };

  useEffect(() => {
    if (category) {
      getCategory();
    }
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCategoryChange = (clickedCategory, e) => {
    e.stopPropagation();
    setCategory(clickedCategory);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };
  return (
    <div className="w-full" onClick={toggleDropdown}>
      <div className="flex w-full justify-between border border-slate-300 px-3 py-2 rounded-md cursor-pointer">
        <span>{category ? category?.categoryName : "Select Category"}</span>
        {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      {dropdownOpen && (
        <div className="border border-slate-300 w-full h-40 rounded-md overflow-y-auto">
          <div className="flex flex-col items-center text-md">
            {categories?.map((category) => (
              <div
                className="hover:bg-slate-300 w-full h-10 flex items-center justify-center"
                key={category?._id}
                value={category?.categoryName}
                onClick={(e) => handleCategoryChange(category, e)}
              >
                {category?.categoryName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admindropdown;
