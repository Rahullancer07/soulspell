import express from "express";
import { requireSignIn } from "../middleware/auth.middleware.js";
import { addAddressController , updateAddressController , getAddressController, deleteAddressController} from "../controllers/address.controller.js";

// router object 
const router = express.Router();

router.get("/getAll-address", getAddressController);

router.post("/addAddress" , requireSignIn , addAddressController);

router.post("/updateAddress" , requireSignIn , updateAddressController);

router.delete("/deleteAddress" , requireSignIn , deleteAddressController);

export default router