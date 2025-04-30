const express = require('express');
const { createTransaction } = require('../../controllers/transaction');
const router = express.Router();

router.post("/", createTransaction);

module.exports = router;