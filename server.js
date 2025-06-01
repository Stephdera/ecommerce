const express = require("express");
const swaggerUi =require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const connectDB = require("./config/db");
const categoryRouter = require("./routers/categoryRouter");
const productRouters = require("./routers/productRouters");
const authRouters = require('./routers/authRouters');
const cartRouter = require("./routers/cartRouter");
const paymentRouters = require("./routers/paymentRouters");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();


const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce API",
        version: "1.0.0",
        description: "API information for your Ecommerce Express app",
        contact: {
          name: "Adedokun Promise",
          email: "pogooluwa12@gmail.com",
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
      },
    },
    apis: ["./routers/*.js"], // Path to your API files
};
  

connectDB()
dotenv.config()

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174", "https://star-stores.vercel.app", "*"],
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

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!...`));