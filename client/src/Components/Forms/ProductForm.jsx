import { useState, useEffect } from "react";
import AdminDropdown from "../Dropdown/AdminDropdown";
import ImageInput from "../ImageInput/ImageInput";
import { AddIcon } from "../../Icons/Icons";
import SizeQuantityInput from "../SizeQuantityInput/SizeQuantityInput";
import axios from "axios";
import { toast } from "react-toastify";

const ProductFormModal = ({
  isModalOpen,
  setIsModalOpen,
  getAllProducts,
  selectedProduct,
}) => {
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );
  const [price, setPrice] = useState(
    selectedProduct ? selectedProduct.price : ""
  );
  const [category, setCategory] = useState(
    selectedProduct ? selectedProduct.category : null
  );
  const [categories, setCategories] = useState({});
  const [image, setImage] = useState("");
  const [images, setImages] = useState(
    selectedProduct ? selectedProduct.images : []
  );
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sizeQuantity, setSizeQuantity] = useState(
    selectedProduct ? selectedProduct.sizeQuantity : []
  );

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAll-category");
      if (data?.success) {
        setCategories(data?.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleImages = (e) => {
    const newImageUrls = [...images, image];
    setImages(newImageUrls);
    setImage("");
  };

  const addSizeQuantity = () => {
    const newSizeQuantity = [
      ...sizeQuantity,
      { size: size, quantity: quantity },
    ];
    setSizeQuantity(newSizeQuantity);
    setSize("");
    setQuantity(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      sizeQuantity.length === 0 ||
      images.length === 0
    ) {
      // If any required field is empty, display an error message
      toast.error("Please fill in all required fields");
      return;
    }
    // Handle form submission
    try {
      const { data } = await axios.post(
        `/api/v1/product/${
          selectedProduct ? `update-product/${selectedProduct._id}` : "create-product"
        }`,
        {
          name: name,
          price: price,
          description: description,
          category: category,
          sizeQuantity: sizeQuantity,
          images: images,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllProducts();
        setName("");
        setPrice(null);
        setImages([]);
        setDescription("");
        setSizeQuantity(null);
        setIsModalOpen(false);
        setSizeQuantity([]);
        setCategory(null);
      } else {
        console.log("error");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full flex items-center justify-center ${
        isModalOpen ? "bg-gray-800 bg-opacity-50" : "hidden"
      }`}
    >
      <div className="bg-slate-300 p-8 rounded-md shadow-lg w-4/5 h-3/4 overflow-auto">
        <span className="text-lg md:text-2xl font-semibold uppercase tracking-wider">
          Add Product
        </span>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex flex-col gap-5 w-full">
                <div className="bg-white px-3 py-5 rounded-lg shadow-md">
                  <p className="mb-2 uppercase font-medium tracking-wide pl-2">
                    Description
                  </p>
                  <div className="border border-slate-300 flex flex-col bg-white rounded-lg px-5 py-5">
                    <label
                      htmlFor="product_name"
                      className="text-slate-500 font-medium mb-1"
                    >
                      Product Name
                    </label>
                    <input
                      placeholder="Enter Product Name"
                      type="text"
                      required
                      className="border border-slate-300 px-3 py-2 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="product_description"
                      className="text-slate-500 font-medium mb-1 mt-3"
                    >
                      Product Description
                    </label>
                    <textarea
                      placeholder="Enter Product Description"
                      type="text"
                      required
                      className="border border-slate-300 px-3 py-2 rounded-md"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label
                      htmlFor="product_price"
                      className="text-slate-500 font-medium mb-1 mt-3"
                    >
                      Product Price
                    </label>
                    <input
                      placeholder="Enter Product Price"
                      type="number"
                      required
                      className="border border-slate-300 px-3 py-2 rounded-md"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-white px-3 py-5 rounded-lg shadow-md">
                  <p className="mb-2 uppercase font-medium tracking-wide pl-2">
                    Category
                  </p>
                  <div className="border border-slate-300 flex flex-col bg-white rounded-lg px-5 py-5">
                    <label
                      htmlFor="category"
                      className="text-slate-500 font-medium mb-1"
                    >
                      Category
                    </label>
                    <AdminDropdown
                      categories={categories}
                      category={category}
                      setCategory={setCategory}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="bg-white px-3 py-5 rounded-lg shadow-md">
                  <p className="mb-2 uppercase font-medium tracking-wide pl-2">
                    Images
                  </p>
                  <div className="border border-slate-300 flex flex-col bg-white rounded-lg px-5 py-5">
                    <label
                      htmlFor="image_url"
                      className="text-slate-500 font-medium mb-1"
                    >
                      Image URL
                    </label>
                    <div className="w-full flex flex-row">
                      <input
                        placeholder="Enter Image URL"
                        type="text"
                        required
                        value={image}
                        className="border border-slate-300 px-3 py-2 rounded-l-md w-11/12"
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <div
                        className="bg-slate-400 w-1/12 flex items-center justify-center rounded-r-md text-white"
                        onClick={handleImages}
                      >
                        <AddIcon />
                      </div>
                    </div>
                    <ImageInput images={images} setImages={setImages} />
                  </div>
                </div>
                <div className="bg-white px-3 py-5 rounded-lg shadow-md">
                  <p className="mb-2 uppercase font-medium tracking-wide pl-2">
                    Size and Quantity
                  </p>
                  <div className="border border-slate-300 flex flex-col bg-white rounded-lg px-5 py-5">
                    <label
                      htmlFor="product_name"
                      className="text-slate-500 font-medium mb-1"
                    >
                      Size And Quantity
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        placeholder="Product Size"
                        type="text"
                        required
                        className="border border-slate-300 px-3 py-2 rounded-md"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                      <input
                        placeholder="Product Quantity"
                        type="number"
                        required
                        className="border border-slate-300 px-3 py-2 rounded-md"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <div
                        className="bg-slate-400 flex items-center justify-center rounded-md text-white px-1"
                        onClick={addSizeQuantity}
                      >
                        <AddIcon />
                      </div>
                    </div>
                    <SizeQuantityInput
                      sizeQuantity={sizeQuantity}
                      setSizeQuantity={setSizeQuantity}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <input
                    type="submit"
                    onClick={handleSubmit}
                    className="border border-slate-700 bg-slate-400 h-10 rounded-lg text-white"
                    value={selectedProduct ? "Update" : "Create"}
                  />
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="border border-slate-700 bg-white-400 h-10 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
