import { MoreVertIcon } from "../../Icons/Icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../Components/Forms/CategoryForm"

const CreateCategory = () => {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, image);
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        categoryName: name,
        categoryImage: image,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
        setImage("");
      } else {
        console.log("error");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-fit p-10">
      <span className="text-3xl uppercase font-medium tracking-wider">
        Categories
      </span>
      <div className="w-full my-10 bg-white rounded-lg border border-slate-500">
        <CategoryForm
          handleSubmit={handleSubmit}
          image={image}
          setImage={setImage}
          name={name}
          setName={setName}
        />
      </div>
      <div className="w-full rounded-lg bg-white min-h-fit text-xs sm:text-sm md:text-lg border border-slate-500">
        <div className="flex flex-col">
          <div className="flex justify-between bg-slate-200 h-10 items-center px-3 md:px-8 rounded-t-lg">
            <div className="font-semibold tracking-wider uppercase w-3/6 flex items-start">
              Image
            </div>
            <div className="font-semibold tracking-wider uppercase w-2/6 flex items-start">
              Name
            </div>
            <div className="font-semibold tracking-wider uppercase w-1/6 flex items-start">
              Action
            </div>
          </div>
          <div className="my-3">
            {categories?.map((category) => (
              <div
                className="flex justify-between px-3 md:px-8 items-center h-20 sm:h-24 md:h-40"
                key={category._id}
              >
                <div className="font-normal tracking-wider uppercase w-3/6 flex items-start">
                  <img
                    className="h-14 sm:h-20 md:h-36"
                    src={`${category.categoryImage}`}
                    alt="category_image"
                  />
                </div>
                <div className="font-normal tracking-wider uppercase w-2/6 flex items-start">
                  {category.categoryName}
                </div>
                <div className="font-normal tracking-wider uppercase w-1/6 flex items-start">
                  <MoreVertIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
