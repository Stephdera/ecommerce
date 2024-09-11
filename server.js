const express = require("express");
const connectDB = require("./config/db");
const categoryRouter = require("./routers/categoryRouter");
const productRouters = require("./routers/productRouters");
const authRouters = require('./routers/authRouters');
const cartRouter = require("./routers/cartRouter");
const paymentRouters = require("./routers/paymentRouters");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

connectDB()
dotenv.config()

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174", "*"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true

}))

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/", categoryRouter);
app.use("/", productRouters);
app.use("/", authRouters);
app.use("/", cartRouter);
app.use("/", paymentRouters);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!...`));