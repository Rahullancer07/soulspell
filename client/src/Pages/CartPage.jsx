import React, { useEffect, useState } from "react";
import { useCart } from "../Context/cart.context";
import { AddIcon, RemoveIcon, DeleteIcon } from "../Icons/Icons";
import emptyCart from "../Images/EmptyCart.png";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const shippingCharge = cart.length > 0 ? 500 : 0;
  const taxCharge = cart.length > 0 ? 100 : 0;

  useEffect(() => {
    let updatedCartTotal = 0;
    if (cart.length > 0) {
      for (let itemIndex = 0; itemIndex < cart.length; itemIndex++) {
        updatedCartTotal +=
          cart[itemIndex].product.price * cart[itemIndex].quantity;
        setSubtotal(updatedCartTotal);
      }
    }
    else{
        setSubtotal(0);
    }
    let updatedOrderTotal = updatedCartTotal + shippingCharge + taxCharge;
    setOrderTotal(updatedOrderTotal);
  }, [cart]);

  const addQuantity = (productId) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(
        (cartItem) => cartItem.product._id === productId
      );
      const newQuantity = prevCart[productIndex].quantity + 1;
      const updatedCart = [...prevCart];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: newQuantity,
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const subtractQuantity = (productId) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(
        (cartItem) => cartItem.product._id === productId
      );
      const newQuantity = prevCart[productIndex].quantity - 1;
      const updatedCart = [...prevCart];
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: newQuantity,
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (productId) => {
    const productIndex = cart.findIndex(
      (cartItem) => cartItem.product._id === productId
    );
    const newCart = [...cart];
    newCart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 uppercase">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="shadow-md p-6 col-span-2">
          {/* Item 1 */}
          {cart?.map((cartItem , index) => (
            <div className="flex items-center border-b border-slate-200 py-4" key={index}>
              <img
                src={cartItem.product.images[0]}
                alt="Product"
                className="w-48 h-48 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {cartItem.product.name}
                </h2>
                <p className="text-gray-600">
                  {cartItem.product.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              </div>
              <div className="ml-auto flex items-center justify-center">
                {/* Quantity button  */}
                <div className="flex flex-row items-center border-slate-400 border">
                  <button
                    disabled={cartItem.quantity === 1}
                    className="py-1 text-black items-center justify-center"
                    onClick={() => subtractQuantity(cartItem.product._id)}
                  >
                    <RemoveIcon
                      color={cartItem.quantity === 1 ? "disabled" : "inherit"}
                    />
                  </button>
                  <span className="px-6 rounded-lg">{cartItem.quantity}</span>
                  <button
                    className="py-1 text-black items-center justify-center"
                    onClick={() => addQuantity(cartItem.product._id)}
                  >
                    <AddIcon />
                  </button>
                </div>
                <button
                  className="ml-4 text-slate-500 focus:outline-none"
                  onClick={() => removeItem(cartItem.product._id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div>
              <img src={emptyCart} alt="empty cart" />
            </div>
          )}
        </div>
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-md shadow-md col-span-1 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>
              {subtotal?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>
              {shippingCharge?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>
              {taxCharge?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              {orderTotal?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
