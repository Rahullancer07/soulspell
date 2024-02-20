import products from "../../Data/products";
import { Link } from "react-router-dom";

const CatergoryCard = () => {
  return (
    <div className="bg-white flex align-center items-center">
      <div className="mx-auto px-4 py-10 max-w-full">
        <h2 className="text-lg md:text-xl text-gray-900 uppercase text-center">
          Soul Love
        </h2>
        <h3 className="mt-3 text-xl md:text-2xl font-semibold text-gray-900 uppercase text-center">
          Sneakers
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-10">
          {products.map((product, index) => (
            <Link to="/product" key={index}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-90"
                />
              </div>
              <h3 className="mt-4 text-xs md:text-lg text-gray-900 text-wrap">
                {product.name}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-center mt-5">
          <Link to="/category">
            <button className="flex bg-black border-2 border-white text-white px-5 py-2 hover:bg-white hover:text-black hover:border-black">
              View More
            </button>
          </Link>
          <div className="mt-8 m">
            <div className="border-b border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatergoryCard;
