import express from "express"
import { loginController, registerController, testController , accountController} from "../controllers/auth.controller.js";
import { requireSignIn, isAdmin } from "../middleware/auth.middleware.js";

// router object 
const router = express.Router();

// routing

// REGISTER || MEATHOD POST
router.post('/register', registerController)

// LOGIN || MEATHOD POST
router.post('/login', loginController)

router.get('/test', requireSignIn, isAdmin, testController)

// PROTECTED ROUTES
router.get("/account/admin", requireSignIn , isAdmin , accountController);

router.get("/account/user", requireSignIn , accountController);

export default router