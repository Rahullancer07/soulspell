import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AddIcon } from "../../Icons/Icons";
import ProductFormModal from "../../Components/Forms/ProductForm";

const CreateProducts = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/getAll-product");
      if (data?.success) {
        setAllProducts(data?.allProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products");
    }
  };

  const handleProductModal = () => {
    setIsModalOpen(true);
  };

  const handleProductUpdate = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  useEffect(() => {
    getAllProducts();
  }, [allProducts]);

  return (
    <div className="w-full h-fit p-5 md:p-10">
      <span className="text-3xl uppercase font-medium tracking-wider">
        Products
      </span>
      <div className="w-full h-fit border bg-white rounded-lg my-10 border-slate-500 px-5 py-5">
        <div className="flex flex-row items-center justify-center">
          <button
            className="rounded-lg px-3 py-3 text-white bg-slate-600 hover:bg-white hover:text-slate-600 flex flex-row justify-center items-center"
            onClick={handleProductModal}
          >
            <AddIcon /> Add Product
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5 gap-5">
          {allProducts?.map((product) => (
            <div
              className="flex flex-col items-center justify-between border border-slate-500 rounded-lg shadow-lg py-3"
              key={product._id}
              onClick={() => handleProductUpdate(product)}
            >
              <div>
                <img
                  src={product?.images[0]}
                  alt="prd_img"
                  className="rounded-lg object-contain h-24 w-48 md:h-48 md:w-96"
                />
              </div>
              <span className="w-fit px-2 md:px-5 text-wrap text-center font-normal text-xs sm:text-sm">
                {product?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Product Modal form  */}
      {isModalOpen && (
        <ProductFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getAllProducts={getAllProducts}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default CreateProducts;
