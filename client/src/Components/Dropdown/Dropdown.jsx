import React, { useState } from "react";
import {ArrowDropDownIcon , ArrowDropUpIcon} from "../../Icons/Icons"

const size = [4, 4.5, 5, 5.5, 6, 6.5];

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="w-full" onClick={() => setDropdownOpen(prev => !prev)}>
      <div className="flex w-full justify-between border-2 border-slate-300 items-center px-3 py-3 gap-2 cursor-pointer">
        <span>Size</span>
        {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      {dropdownOpen && <div className="border-2 border-slate-300 w-full mt-3 h-48 overflow-y-auto">
        <ul className="flex flex-col items-center font-medium text-lg">
            {size.map((sizeValue , index) => (
                <li className="tracking-wider hover:bg-slate-300 w-full px-10 h-14 flex items-center justify-center" key={index}>{`UK ${sizeValue}`}</li>
            ))}
        </ul>
      </div>}
    </div>
  );
};

export default Dropdown;
