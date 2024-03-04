import { Product } from "../models/product.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

// Create Product Controller
export const createProductController = async (req, res) => {
    try {
        const { name, price, description, category, sizeQuantity, images } =
            req.body;

        // Validation on all fields
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !sizeQuantity || sizeQuantity.length === 0:
                return res.status(500).send({ error: "Quantity and Size are Required" });
            case !images || images.length === 0:
                return res
                    .status(500)
                    .send({ error: "Product Images are required" });
        }
        const uploadPromises = images.map(image => uploadImageToCloudinary(image));
        const imagesURL = await Promise.all(uploadPromises);

        const product = new Product({ name, price, description, category, sizeQuantity, images: imagesURL }).save();
        res.status(200).send({
            success: true,
            message: "Product uploaded successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        })
    }
}

// Get all product controller
export const getAllProductController = async (req, res) => {
    try {
        const allProducts = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalProducts: allProducts.length,
            allProducts,
            message: "Successfully fetched all products"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all products",
            error
        })
    }
}

// Get single product
export const getOneProductController = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Return the product
        res.status(200).json({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

// Update product controller
export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, sizeQuantity, images } = req.body;

        // Find the product by ID
        let product = await Product.findById(id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update product fields
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.sizeQuantity = sizeQuantity;

        //Handling images 

        // Identify images in product.images that are no longer present in images
        const outdatedImages = product.images.filter(image => !images.includes(image));
        // Remove outdated images from product.images
        product.images = product.images.filter(image => !outdatedImages.includes(image));
        if (images) {
            // Filter out images that are already present or matched with existing image URLs
            const newImages = images.filter(image => !product.images.includes(image));
            if (newImages.length > 0) {
                try {
                    // Upload new images to Cloudinary
                    const uploadPromises = newImages.map(image => uploadImageToCloudinary(image));
                    const uploadedImages = await Promise.all(uploadPromises);

                    // Concatenate uploaded images with existing images
                    product.images = [...product.images, ...uploadedImages];
                } catch (error) {
                    console.error("Error uploading images to Cloudinary:", error);
                    // Handle error (e.g., show error message to user)
                }
            }
        }


        // Save the updated product
        product = await product.save();

        // Return the updated product
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while updating product",
            error: error.message,
        });
    }
};