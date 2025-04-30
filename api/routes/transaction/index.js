const express = require('express');
const { createTransaction, getTransactions } = require('../../controllers/transaction');
const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactions);

module.exports = router;