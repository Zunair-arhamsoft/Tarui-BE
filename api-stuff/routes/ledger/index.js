const express = require('express');
const { getLedgers, getLedgerDetails, createLedger, getLedgerTransactionsByDate } = require('../../controllers/ledger');
const router = express.Router();

router.get("/", getLedgers);
router.get("/:id", getLedgerDetails);
router.post("/", createLedger);
router.post("/", createLedger);
router.get("/:id/transactions", getLedgerTransactionsByDate);



module.exports = router;
