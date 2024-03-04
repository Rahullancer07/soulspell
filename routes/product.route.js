import express from "express";
import { requireSignIn, isAdmin } from "../middleware/auth.middleware.js";
import { createProductController, deleteProductController, getAllProductController, getOneProductController, updateProductController } from "../controllers/product.controller.js";

const router = express.Router();

// create product route
router.post("/create-product", requireSignIn, isAdmin, createProductController)

// get all product 
router.get("/getAll-product", getAllProductController);

// get single product
router.get("/getOne-product/:id", getOneProductController);

// delete product
router.post("/delete-product/:id", requireSignIn, isAdmin, deleteProductController);

// update product
router.post("/update-product/:id", requireSignIn , isAdmin , updateProductController);

export default router;