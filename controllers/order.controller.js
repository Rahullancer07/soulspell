import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const placeOrderController = async (req, res) => {
    const { orderItems, userId, addressId, orderTotal } = req.body;

    // Check required fields
    if (!orderItems || !userId || !addressId || !orderTotal) {
        return res.status(400).send({ success: false, message: 'Please provide order items, user ID, and address ID' });
    }

    try {
        // Check each product's quantity
        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).send({ success: false, message: `Product with ID ${item.productId} not found` });
            }
            const quantityAvailable = product?.sizeQuantity?.find(
                (sq) => sq?.size === item.size
            );
            if (!quantityAvailable || quantityAvailable.quantity < item.quantity) {
                return res.status(400).send({ success: false, message: `Quantity of product ${product.name} exceeds available quantity` });
            }
        }

        // Create order
        const order = new Order({ orderItems, userId, addressId, orderTotal });
        await order.save();

        // Update product quantities
        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            const sizeQuantityIndex = product.sizeQuantity.findIndex(sq => sq.size === item.size);
            product.sizeQuantity[sizeQuantityIndex].quantity -= item.quantity;
            await product.save();
        }

        res.status(201).send({ success: true, message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error placing order', error: error.message });
    }
}

export const updateOrderController = () => {

}


export const getOrderController = async (req, res) => {
    try {
        const allOrders = await Order.find({}).sort({ createdAt: -1 }).populate('orderItems.productId');;
        res.status(200).send({
            success: true,
            allOrders,
            message: "Successfully fetched all orders"
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error retrieving orders', error: error.message });
    }
}