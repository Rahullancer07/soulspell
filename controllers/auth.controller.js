import { User } from "../models/user.model.js"
import { comparePassword, hashPassword } from "../utils/auth.helper.js";
import JWT from "jsonwebtoken";

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password , addresses} = req.body

        //validation 
        if (!firstName) {
            return res.send({ message: 'FirstName is required' });
        }
        if (!lastName) {
            return res.send({ message: 'LastName is required' });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }

        // check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Email already registered. Please Login !!'
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new User({ firstName, lastName, email, password: hashedPassword, addresses }).save()

        res.status(201).send({
            success: true,
            message: 'User successfully registered',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registrations',
            error
        })
    }
}


// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // check user exist or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered , please register'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            });
        }
        // create token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: 'Logged In successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                addresses: user.addresses,
                isAdmin: user.isAdmin,
                id: user._id
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

// test controller
export const testController = (req, res) => {
    try {
        res.send('Protected route')
    } catch (error) {
        console.log(error);
    }
}

// account controller
export const accountController = (req, res) => {
    try {
        res.send('Account is accessible');
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Login to check account page',
            error
        })
    }
}

