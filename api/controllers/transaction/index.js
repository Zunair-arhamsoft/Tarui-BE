const { Transaction, Product } = require("../../models");
const { Op } = require("sequelize");

exports.createTransaction = async (req, res) => {
    try {
        const {
            ledgerId,
            type,
            description,
            amount,
            selectedProducts,
        } = req.body;
        if (!ledgerId || !type) {
            return res.status(400).json({ message: "ledgerId and type are required.", success: false });
        }

        const latestTransaction = await Transaction.findOne({
            where: { ledgerId },
            order: [["createdAt", "DESC"]],
        });

        let prevBalance = parseFloat(latestTransaction?.runningBalance || 0);
        let delta = 0;
        let computedAmount = 0;

        const calcProductTotal = () =>
            selectedProducts?.reduce((sum, p) => sum + (p.price * p.quantity), 0) || 0;

        if (["Buy", "Sell", "Return", "Open Sell", "Breakage"].includes(type)) {
            if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
                return res.status(400).json({ message: `selectedProducts is required for type "${type}".`, success: false });
            }

            computedAmount = calcProductTotal();

            for (const product of selectedProducts) {
                const dbProduct = await Product.findByPk(product.id);

                if (!dbProduct) {
                    return res.status(404).json({ message: `Product with id ${product.id} not found.`, success: false });
                }

                // Quantity updates
                if (["Buy", "Return"].includes(type)) {
                    dbProduct.qty += product.quantity;
                } else if (["Sell", "Open Sell", "Breakage"].includes(type)) {
                    if (dbProduct.quantity < product.quantity) {
                        return res.status(400).json({ message: `Insufficient quantity for product ${dbProduct.name}.`, success: false });
                    }
                    dbProduct.qty -= product.quantity;
                }

                await dbProduct.save();
            }

            // Balance logic
            if (["Buy", "Return"].includes(type)) delta = -computedAmount;
            if (["Sell", "Open Sell"].includes(type)) delta = computedAmount;
        }

        if (["Credit Amount", "Debit Amount"].includes(type)) {
            const numericAmount = parseFloat(amount);
            if (isNaN(numericAmount)) {
                return res.status(400).json({ message: `Amount must be a valid number for type "${type}".`, success: false });
            }

            computedAmount = numericAmount;
            delta = type === "Credit Amount" ? -computedAmount : computedAmount;
        }

        const runningBalance = prevBalance + delta;

        const transaction = await Transaction.create({
            userId: req.user?.id,
            ledgerId,
            type,
            description,
            amount: computedAmount,
            runningBalance,
            selectedProducts: selectedProducts || [],
        });

        return res.status(201).json({
            message: "Transaction created successfully.",
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
};


exports.getTransactions = async (req, res) => {
    const { page = 1, limit = 10, search, id } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
        ledgerId: id,
        ...(search && {
            type: {
                [Op.iLike]: `%${search}%`,
            },
        }),
    };

    try {
        const transactions = await Transaction.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
        });

        res.json({
            total: transactions.count,
            pages: Math.ceil(transactions.count / limit),
            currentPage: parseInt(page),
            data: transactions.rows,
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message, success: false });
    }
};
