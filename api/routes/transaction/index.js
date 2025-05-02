const express = require('express');
const { createTransaction, getTransactions, createBreakageTransaction, createOpenSellTransaction } = require('../../controllers/transaction');
const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);
router.post("/breakage", createBreakageTransaction);
router.post("/openSell", createOpenSellTransaction);

module.exports = router;