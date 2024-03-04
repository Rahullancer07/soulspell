import React from "react";
import { CancelIcon } from "../../Icons/Icons";

const SizeQuantityInput = ({ sizeQuantity, setSizeQuantity }) => {
  // removing size quantity
  const handleSizeQuantityRemoval = (index) => {
    const newSizeQuantity = [...sizeQuantity];
    newSizeQuantity.splice(index, 1);
    setSizeQuantity(newSizeQuantity);
  };
  return (
    <div className="grid grid-cols-3 py-3 gap-4">
      {sizeQuantity?.map((sizeQuantity, index) => (
        <div className="flex items-center relative" key={index}>
          <div className="border border-slate-400 bg-slate-200 flex items-center h-10 w-full justify-center rounded-lg text-slate-500">
            {sizeQuantity?.size} : {sizeQuantity?.quantity}
          </div>
          <div className="absolute -top-2 -right-2 text-slate-500">
            <CancelIcon onClick={() => handleSizeQuantityRemoval(index)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SizeQuantityInput;
