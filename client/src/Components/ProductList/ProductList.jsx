import React, { useState, useEffect } from "react";
import FiltersSection from "../Filter/FiltersSection";
import products from "../../Data/products";
import { Link } from "react-router-dom";

const ProductList = ({ category, products }) => {
  const [categoryProducts, setCategoryProducts] = useState(null);

  useEffect(() => {
    if (category) {
      // Find the products object with matching categoryId
      const allProducts = products?.filter(
        (product) => product.category === category._id
      );
      setCategoryProducts(allProducts);
    }
  }, [products, category]);

  return (
    <div>
      {/* Image of the category */}
      <div>
        <img
          src={category?.categoryImage}
          alt="..."
          className="w-8/12 object-fit h-auto mx-auto mb-10"
        />
      </div>
      <div className="flex justify-center items-center text-2xl uppercase font-semibold tracking-widest ">
        {category?.categoryName}
      </div>
      <div className="pt-10 flex items-center justify-center">
        <FiltersSection />
      </div>
      {/* Products list */}
      <div className="bg-white mb-10">
        <div className="mx-auto max-w-2xl lg:max-w-full">
          <h2 className="sr-only">Products</h2>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
            {categoryProducts?.map((product) => (
              <Link to={`/product/${product?._id}`} key={product._id}>
                <div className="flex flex-col h-full items-center justify-between">
                  <img
                    src={product?.images[0]}
                    alt="product_image"
                    className="object-contain object-center group-hover:opacity-90 "
                  />
                  <div>
                    <h3 className="mt-4 text-xs md:text-sm font-semibold tracking-wider text-gray-900 text-wrap text-center flex justify-start">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-md lg:text-md font-semibold text-gray-900 text-center">
                      ₹ {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
