import JWT from "jsonwebtoken"
import { User } from "../models/user.model.js";

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        console.log('user is authenticated');
        next();
    } catch (error) {
        console.log(`Error in JWT : ${error}`);
        
    }
}

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user.isAdmin){
            return res.status(401).send({
                success : false,
                message : 'Unauthorized Access'
            });
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success : false,
            message : "Error in Admin middleware",
            error
        })
    }
}