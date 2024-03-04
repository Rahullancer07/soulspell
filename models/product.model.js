import mongoose from "mongoose";

// Schema for images of the product
const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});
const Image = mongoose.model("Image", imageSchema);

// sizeQuantity schema for product
const sizeQuantitySchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
// Create the SizeQuantity model
const SizeQuantity = mongoose.model('SizeQuantity', sizeQuantitySchema);

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true
    },
    sizeQuantity: [SizeQuantity.schema], // Array of sizeQuantity objects
    images: [{
        type: String // Array of image URLs
    }]
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);