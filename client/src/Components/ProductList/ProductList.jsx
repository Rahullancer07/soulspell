import React from "react";
import products from "../../Data/products";
import FiltersSection from "../Filter/FiltersSection";
import { Link } from "react-router-dom";

const ProductList = () => {
  return (
    <div>
      {/* Image of the category */}
      <div>
        <img
          src="https://crepdogcrew.com/cdn/shop/collections/Tab_Banners_1.png?v=1703695662"
          alt="..."
          className="w-full object-fit h-auto"
        />
      </div>
      <div className="pt-10 flex items-center justify-center">
        <FiltersSection/>
      </div>
      {/* Products list */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-full">
          <h2 className="sr-only">Products</h2>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
            {products.map((product, index) => (
              <Link to="/product" key={index}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
