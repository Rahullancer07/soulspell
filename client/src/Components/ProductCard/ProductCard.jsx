import React, { useState, useEffect } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import { RemoveIcon, AddIcon } from "../../Icons/Icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../Context/cart.context";
import ProductImageCarousel from "../Carousel/ProductImageCarousel";

const ProductCard = () => {
  const productId = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getOne-product/${productId?.id}`
      );
      if (data) {
        // console.log(data);
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting product");
    }
  };

  const handleCart = (product) => {
    // check if the quantity is available or not
    const quantityAvailable = product?.sizeQuantity?.find(
      (size) => size?._id === selectedSize?._id
    );
    if (quantityAvailable?.quantity < quantity) {
      toast.error(
        "Exceeds available quantity limit. Please choose a lower amount"
      );
      return;
    } else {
      const updatedCart = [
        ...cart,
        {
          product,
          quantity,
        },
      ];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div className="max-w-fit mt-16 mb-10 min-h-screen">
      <div className="flex flex-col justify-between lg:flex-row gap-16 px-10 md:px-20">
        <ProductImageCarousel images={product?.images} />
        {/* ABOUT */}
        <div className="w-full md:w-3/5 lg:w-2/5 items-start mt-8 mx-auto">
          <div className="flex flex-col gap-4 w-full text-left">
            {/* Name and Price  */}
            <div>
              <h1 className="text-2xl md:text-3xl  font-medium	tracking-wider uppercase text-black">
                {product?.name}
              </h1>
              <h6 className="text-xl md:text-2xl font-medium tracking-wider mt-1.5">
                ₹ {product?.price}
              </h6>
            </div>
            {/* Size Dropdown  */}
            <UserDropdown
              size={product?.sizeQuantity}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
            {/* Quantity button  */}
            <div className="flex flex-row items-center border-slate-400 border w-40">
              <button
                disabled={quantity === 0}
                className="px-4 py-2 text-black items-center justify-center"
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                <RemoveIcon color={quantity === 0 ? "disabled" : "inherit"} />
              </button>
              <span className="px-6 rounded-lg">{quantity}</span>
              <button
                className="px-4 py-2 text-black items-center justify-center"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <AddIcon />
              </button>
            </div>

            {/* Add to cart and buy now button  */}
            <div className="w-full flex flex-col gap-4">
              <button
                className="uppercase border-2 py-3 border-slate-300 hover:border-white hover:text-white hover:bg-black"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
              <button className="uppercase border-2 py-3 bg-black text-white border-white hover:text-black hover:bg-white hover:border-slate-300">
                Buy Now
              </button>
            </div>

            <p className="text-gray-700">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
