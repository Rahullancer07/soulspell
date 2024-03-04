import React, { useState, useEffect } from "react";

const ProductImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex flex-col h-full max-w-2xl items-center mx-auto gap-5 mt-5">
      {/* <img src="https://crepdogcrew.com/cdn/shop/files/1_1dfe9a7f-c9be-41cb-b29e-f841a6bd2330_800x.png?v=1690636382" alt="" /> */}

      {images?.map((image, i) => (
        <div
          key={i}
          className={`object-fit transition-all duration-500 ${
            i === index ? "" : "opacity-0 pointer-events-none hidden"
          }`}
        >
          <img src={image} alt={`Slide ${i}`} />
        </div>
      ))}
      <div className="flex items-center justify-center gap-4">
        {images?.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
