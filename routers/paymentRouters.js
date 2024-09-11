const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControllers");
const { auth } = require("../middleware/auth");



router.post("/api/payment/initiate", auth, paymentController.initiatePayment);
router.post("/api/payment/verify", auth, paymentController.verifyPayment);

module.exports = router;