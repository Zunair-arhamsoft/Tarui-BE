const { Op } = require("sequelize");
const { Product } = require("../../models");

// Get all products with pagination and search
exports.getProducts = async (req, res) => {
    // const { page = 1, limit = 10, search } = req.query;
    // const offset = (page - 1) * limit;

    const whereClause = {
        userId: req.user.id,
        // ...(search && {
        //     name: {
        //         [Op.iLike]: `%${search}%`,
        //     },
        // }),
    };

    try {
        const products = await Product.findAndCountAll({
            where: whereClause,
            // limit: parseInt(limit),
            // offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        res.json({
            total: products.count,
            // pages: Math.ceil(products.count / limit),
            // currentPage: parseInt(page),
            data: products.rows,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Get details of a specific product
exports.getProductDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: { id, userId: req.user.id },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, qty, description } = req.body;

        if (!name || qty === undefined) {
            return res.status(400).json({ message: "Product name and qty are required" });
        }

        const product = await Product.create({
            name,
            qty,
            description,

            userId: req.user.id,
        });

        res.status(201).json({ message: "Product created", product });
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, qty, description, } = req.body;

    try {
        const product = await Product.findOne({
            where: { id, userId: req.user.id },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.update({
            name: name ?? product.name,
            qty: qty ?? product.qty,
            description: description ?? product.description,
        });

        res.json({ message: "Product updated", product });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: { id, userId: req.user.id },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();

        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
