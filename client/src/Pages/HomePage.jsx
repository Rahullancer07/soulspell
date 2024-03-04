import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel/Carousel";
import CatergoryCard from "../Components/CategoryCard/CatergoryCard";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [categories, setCategories] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
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

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <div>
      <Carousel />
      <CatergoryCard
        categoryName="Sneakers"
        categories={categories}
        allProducts={allProducts}
      />
      <CatergoryCard
        categoryName="Streetwear"
        categories={categories}
        allProducts={allProducts}
      />
      <CatergoryCard
        categoryName="Hype"
        categories={categories}
        allProducts={allProducts}
      />
      <CatergoryCard
        categoryName="Accessories"
        categories={categories}
        allProducts={allProducts}
      />
    </div>
  );
};

export default HomePage;
