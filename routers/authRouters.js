const authControllers = require("../controllers/authControllers");
const { auth } = require("../middleware/auth");
const express = require('express');
const router = express.Router();

router.post("/api/register", authControllers.register)
router.post("/api/login", authControllers.login)
router.get("/api/user", auth, authControllers.getUser)
router.get("/api/all-users", authControllers.getAllUsers)

module.exports = router;