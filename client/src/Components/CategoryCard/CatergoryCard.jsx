import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const CatergoryCard = ({ categoryName, categories, allProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (categories && categoryName) {
      // Find the category object with matching categoryName
      const category = categories.find(
        (category) => category.categoryName === categoryName
      );
      if (category) {
        const allFilteredProducts = allProducts?.filter(
          (product) => product.category === category._id
        );
        setFilteredProducts(allFilteredProducts);
      }
    }
  }, [categories, categoryName , allProducts]);

  return (
    <div className="bg-white flex align-center items-center">
      <div className="mx-auto px-4 py-10 max-w-full">
        <h2 className="text-lg md:text-xl text-gray-900 uppercase text-center">
          Soul Love
        </h2>
        <h3 className="mt-3 text-xl md:text-2xl font-semibold text-gray-900 uppercase text-center">
          {categoryName}
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
          {filteredProducts?.slice(0, 8).map((product) => (
            <NavLink to={`/product/${product._id}`} key={product._id}>
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
            </NavLink>
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <NavLink
            to={`/category/${categoryName}`}
          >
            <button className="flex bg-black border-2 border-white text-white px-5 py-2 hover:bg-white hover:text-black hover:border-black">
              View More
            </button>
          </NavLink>
          <div className="mt-8 m">
            <div className="border-b border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatergoryCard;
