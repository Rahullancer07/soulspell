import React, { useState, useEffect } from "react";
import ProductList from "../Components/ProductList/ProductList";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const categoryName = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/getOne-category/${categoryName?.name}`
      );
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/getAll-product");
      if (data?.success) {
        setProducts(data?.allProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products");
    }
  };

  useEffect(() => {
    getCategory();
    getAllProducts();
  }, [categoryName]);

  return (
    <div>
      <ProductList category={category} products={products} />
    </div>
  );
};

export default CategoryPage;
