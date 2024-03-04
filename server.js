import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js"
import catergoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js"
import addressRoutes from "./routes/address.route.js"
import orderRoutes from "./routes/order.route.js"
import path from "path"

// configure env
dotenv.config();

// db config
connectDB();

// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname , './client/build')))

//PORT
const PORT = process.env.PORT || 8080

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", catergoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/orders", orderRoutes);

// rest api
app.use('*' ,function(req, res){
    res.sendFile(path.join(__dirname , "./client/build/index.html"));
})

// run listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})