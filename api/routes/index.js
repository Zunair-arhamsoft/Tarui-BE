const express = require('express');
const router = express.Router();
const authRoutes = require("./auth/index")
const ledgerRoutes = require("./ledger/index");
const productRoutes = require("./product/index");
const authMiddleware = require('../middleware/auth');

router.use("/auth", authRoutes)
router.use("/ledger", authMiddleware, ledgerRoutes);
router.use("/product", authMiddleware, productRoutes);
module.exports = router;