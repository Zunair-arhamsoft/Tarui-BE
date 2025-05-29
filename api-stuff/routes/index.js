const express = require('express');
const router = express.Router();
const authRoutes = require("./auth/index")
const ledgerRoutes = require("./ledger/index");
const productRoutes = require("./product/index");
const transactionRoutes = require("./transaction/index");
const billSettingRoutes = require("./billSetting/index");
const statRoutes = require("./stats/index");
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        res.send('Hello from api!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).send({ error })
    }
});

router.use("/auth", authRoutes)
router.use("/ledger", authMiddleware, ledgerRoutes);
router.use("/product", authMiddleware, productRoutes);
router.use("/transaction", authMiddleware, transactionRoutes);
router.use("/bill-setting", authMiddleware, billSettingRoutes);
router.use("/stats", authMiddleware, statRoutes);
module.exports = router;