const express = require('express');
const { getProducts, getProductDetails, createProduct, deleteProduct, updateProduct } = require('../../controllers/product');
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductDetails);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;