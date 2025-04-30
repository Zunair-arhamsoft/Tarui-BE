const { Transaction } = require("../../models");

exports.createTransaction = async (req, res) => {
    try {
        const {
            ledgerId,
            type,
            description,
            amount,
            selectedProducts,
        } = req.body;

        // Validate required fields
        if (!ledgerId || !type) {
            return res.status(400).json({ message: "userId, ledgerId, and type are required." });
        }

        // Fetch latest runningBalance
        const latestTransaction = await Transaction.findOne({
            where: { ledgerId },
            order: [["createdAt", "DESC"]],
        });

        let prevBalance = parseFloat(latestTransaction?.runningBalance || 0);
        let delta = 0;

        // Determine amount impact based on transaction type
        const numericAmount = parseFloat(amount);
        const amountRequiredTypes = ["Buy", "Sell", "Open Sell", "Return", "Breakage", "Credit Amount", "Debit Amount"];

        if (amountRequiredTypes.includes(type)) {
            if (isNaN(numericAmount)) {
                return res.status(400).json({ message: `Amount is required and must be a number for type "${type}".` });
            }

            if (["Buy", "Return", "Credit Amount"].includes(type)) {
                delta = numericAmount;
            } else if (["Sell", "Open Sell", "Breakage", "Debit Amount"].includes(type)) {
                delta = -numericAmount;
            }
        }

        const runningBalance = prevBalance + delta;

        const transaction = await Transaction.create({
            userId,
            ledgerId,
            type,
            description,
            amount: numericAmount || null,
            runningBalance,
            selectedProducts: selectedProducts || [],
        });

        return res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
