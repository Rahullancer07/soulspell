import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import {RemoveIcon, AddIcon} from '../../Icons/Icons'

const ProductCard = () => {
  const images = [
    {
      id: 1,
      img: "https://crepdogcrew.com/cdn/shop/products/lowgymred2_800x.png?v=1659504279",
    },
    {
      id: 2,
      img: "https://crepdogcrew.com/cdn/shop/products/lowgymred1_800x.png?v=1659504279",
    },
    {
      id: 3,
      img: "https://hypefly-assets.s3.ap-south-1.amazonaws.com/media/products/desktop_full_size/233-desktop_full_size.webp",
    },
    {
      id: 4,
      img: "https://hypefly-assets.s3.ap-south-1.amazonaws.com/media/products/desktop_thumbnail/234-desktop_thumbnail.webp",
    },
  ];

  const [activeImg, setActiveImage] = useState(images[0].img);
  const [amount, setAmount] = useState(1);

  return (
    <div className="max-w-fit mt-16">
      <div className="flex flex-col justify-between md:flex-row gap-16 px-20">
        {/*Product Images*/}
        <div className="flex flex-col gap-6 md:w-3/5">
          <img
            src={activeImg}
            alt=""
            className="w-full h-full aspect-square object-contain rounded-xl"
          />
          <div className="flex flex-row h-24 justify-evenly">
            {images.map((image , index) => (
              <img
                src={image.img}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(image.img)}
                key={index}
              />
            ))}
          </div>
        </div>
        {/* ABOUT */}
        <div className="flex flex-col gap-4 md:w-2/5 items-start mt-8 text-left">
          {/* Name and Price  */}
          <div>
            <h1 className="text-3xl font-medium	tracking-wider uppercase text-black">
              NIKE DUNK LOW USC
            </h1>
            <h6 className="text-2xl font-medium tracking-wider mt-1.5">
              ₹18,000
            </h6>
          </div>
          {/* Size Dropdown  */}
          <Dropdown/>
          {/* Quantity button  */}
          <div className="flex flex-row items-center border-slate-400 border">
            <button
              disabled={amount === 0}
              className="px-4 py-2 text-black items-center justify-center"
              onClick={() => setAmount((prev) => prev - 1)}
            >
              <RemoveIcon color={amount === 0 ? "disabled" : "inherit"} />
            </button>
            <span className="px-6 rounded-lg">{amount}</span>
            <button
              className="px-4 py-2 text-black items-center justify-center"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              <AddIcon />
            </button>
          </div>

          {/* Add to cart and buy now button  */}
          <div className="w-full flex flex-col gap-4">
            <button className="uppercase border-2 py-3 border-slate-300 hover:border-white hover:text-white hover:bg-black">Add to Cart</button>
            <button className="uppercase border-2 py-3 bg-black text-white border-white hover:text-black hover:bg-white hover:border-slate-300">Buy Now</button>
          </div>

          <p className="text-gray-700">
            The American collegiate scene serves as the inspiration for the Nike
            Dunk Low USC. These '80s-inspired sneakers, worn by a basketball
            great turned street-style hero, add a retro touch to your everyday
            routine. It features a white leather base accompanied by red leather
            overlays, the two representative colours of USC, the University of
            South Carolina at Columbia. To punctuate the whole Nike Dunk Low
            USC, we find a discreet touch of yellow on the brandings of the
            tongue and the heel, colour also present on the equipment of the
            various teams at USC. Feel the foam midsole's thin, flexible
            cushioning while the gripping, pattern-covered rubber outsole takes
            charge of your step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
