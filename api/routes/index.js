const express = require('express');
const router = express.Router();
const authRoutes = require("./auth/index")
const ledgerRoutes = require("./ledger/index");
const authMiddleware = require('../middleware/auth');

router.use("/auth", authRoutes)
router.use("/ledger", authMiddleware, ledgerRoutes);
module.exports = router;