import express from "express";
import { requireSignIn, isAdmin } from "../middleware/auth.middleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getOneCategoryController, updateCategoryController } from "../controllers/category.controller.js";

// router-object
const router = express.Router();

// ROUTING

// Create category route
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// Update category route
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

// Delete category route
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

// Get all categories
router.get('/getAll-category', getAllCategoryController);

// Get single category
router.get('/getOne-category', getOneCategoryController);

export default router;