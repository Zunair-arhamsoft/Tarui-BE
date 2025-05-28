const express = require('express');
const { getLatestTransactions } = require('../../controllers/stats');
const router = express.Router();

router.get("/transactions", getLatestTransactions);


module.exports = router;