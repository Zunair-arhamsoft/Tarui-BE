const express = require('express');
const { getLedgers, getLedgerDetails, createLedger } = require('../../controllers/ledger');
const router = express.Router();

router.get("/", getLedgers);
router.get("/:id", getLedgerDetails);
router.post("/", createLedger);



module.exports = router;
