import { Address } from "../models/address.model.js";

// add address Controller
export const addAddressController = async (req, res) => {
    try {
        const { userId, name, phone, address1, address2, city, state, country, pinCode } = req.body;
        if (!userId) {
            return res.send({ message: 'userId is required' });
        }
        if (!name || !phone || !address1 || !address2 || !city || !state || !country || !pinCode) {
            return res.send({ message: 'All fields are required' });
        }

        // add address
        const address = await new Address({ userId, name, phone, address1, address2, city, state, country, pinCode }).save();

        res.status(200).json({
            success: true,
            message: "Address Added successfully",
            address,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while adding address",
            error: error.message,
        });
    }
}

export const updateAddressController = async (req, res) => {
    try {
        const { name, phone, address1, address2, city, state, country, pinCode, addressId } = req.body;
        if (!addressId) {
            return res.send({ message: 'Address ID is required' });
        }
        if (!name || !phone || !address1 || !address2 || !city || !state || !country || !pinCode) {
            return res.send({ message: 'All fields are required' });
        }
        let oldAddress = await Address.findById(addressId);
        // Check if product exists
        if (!oldAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // updated user fields
        oldAddress.name = name;
        oldAddress.phone = phone;
        oldAddress.address1 = address1;
        oldAddress.address2 = address2;
        oldAddress.city = city;
        oldAddress.state = state;
        oldAddress.country = country;
        oldAddress.pinCode = pinCode;

        oldAddress = await oldAddress.save();

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            oldAddress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while updating address",
            error: error.message,
        });
    }
}

export const getAddressController = async (req, res) => {
    try {
        const addresses = await Address.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            addresses,
            message: "Successfully fetched all address"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all address",
            error
        })
    }
}

//delete controller
export const deleteAddressController = async (req, res) => {
    try {
        const {addressId} = req.body;
        await Address.findByIdAndDelete(addressId)
        res.status(200).send({
            success: true,
            message: "Address Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting address",
            error,
        });
    }
};