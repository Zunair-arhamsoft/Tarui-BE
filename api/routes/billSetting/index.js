const express = require('express');
const { fetchSetting, createSetting, updateSetting } = require('../../controllers/billSetting');
const router = express.Router();

router.get("/", fetchSetting);
router.post("/", createSetting);
router.patch("/:id", updateSetting);



module.exports = router;
