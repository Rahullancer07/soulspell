import React from "react";
import { CancelIcon } from "../../Icons/Icons";

const ImageInput = ({ images, setImages }) => {
  const handleImageRemoval = (index) => {
    const newImageUrls = [...images];
    newImageUrls.splice(index, 1);
    setImages(newImageUrls);
  };
  return (
    <div className="mt-5 grid grid-cols-3">
      {images?.map((image, index) => (
        <div className="flex items-center relative" key={index}>
          <img src={image} alt="image_url" />
          <div className="absolute top-0 right-0 text-slate-300">
            <CancelIcon onClick={() => handleImageRemoval(index)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageInput;
