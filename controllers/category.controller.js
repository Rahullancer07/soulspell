import { Category } from "../models/category.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const createCategoryController = async (req, res) => {
    try {
        const { categoryName, categoryImage } = req.body
        if (!categoryName || !categoryImage) {
            return res.status(401).send({ message: 'All fields are required' })
        }
        // find if category already exist or not
        const existingCategory = await Category.findOne({ categoryName })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            })
        }
        const categoryImageURL = await uploadImageToCloudinary(categoryImage);
        const category = await new Category({ categoryName, categoryImage: categoryImageURL }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category"
        })
    }
}


// Update category controller
export const updateCategoryController = async (req, res) => {
    try {
        const { categoryName, categoryImage } = req.body
        const { id } = req.params

        const categoryImageURL = await uploadImageToCloudinary(categoryImage);
        const category = await Category.findByIdAndUpdate(
            id,
            {
                categoryName: categoryName,
                categoryImage: categoryImageURL
            },
            { new: true }
        )
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating category"
        })
    }
}

// Delete category controller
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted Successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting category"
        })
    }
}

// Get All Categories controller
export const getAllCategoryController = async (req, res) => {
    try {
        const allCategories = await Category.find({});
        res.status(200).send({
            success : true,
            allCategories,
            message : "Successfully fetched all categories"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "Error in getting all categories"
        })
    }
}

// Get One Category controller
export const getOneCategoryController = async (req, res) => {
    try {
        const {categoryName} = req.body
        const category = await Category.findOne({categoryName});
        res.status(200).send({
            success : true,
            category,
            message : "Successfully fetched the Category"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "Error in getting category"
        })
    }
}