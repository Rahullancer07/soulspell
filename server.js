import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import catergoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js"
import addressRoutes from "./routes/address.route.js"

// configure env
dotenv.config();

// db config
connectDB();

// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//PORT
const PORT = process.env.PORT || 8080

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", catergoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/address", addressRoutes);

// rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to SoulSpell</h1>");
})

// run listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})