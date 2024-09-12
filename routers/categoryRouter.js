const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryController");


// Category router
router.post("/api/category", categoryControllers.createCategory);
router.get("/api/category", categoryControllers.getAllCategory);
router.get("/api/one-category", categoryControllers.getOneCategory)

module.exports = router;