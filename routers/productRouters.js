const express = require("express");
const productControllers = require("../controllers/productController");
const multer = require('multer');
const router = express.Router();


const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const uploads = multer({ storage: storage })


/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product created
 */

router.post("/api/product", uploads.array("img", 10), productControllers.createProduct)
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.get("/api/product", productControllers.getAllProduct)
router.get("/api/one-product", productControllers.getProduct)
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: remove a product object 
 *     responses:
 *       201:
 *         description: remove a product object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.delete("/api/product/{id}", productControllers.deleteProduct)
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product object 
 *     responses:
 *       201:
 *         description: update a product object
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.put("/api/product/{id}", productControllers.updateProduct)



module.exports = router;