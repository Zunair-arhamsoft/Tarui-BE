const { Op } = require("sequelize");
const { Transaction, Ledger } = require("../../models");

exports.getLatestTransactions = async (req, res) => {
    try {
        const userId = req.user.id;

        const [
            transactions,
            highestLedgers,
            lowestLedgers,
            positiveBalanceSum,
            negativeBalanceSum
        ] = await Promise.all([
            Transaction.findAndCountAll({
                where: { userId },
                limit: 10,
                order: [["createdAt", "DESC"]],
            }),
            Ledger.findAll({
                where: { userId },
                order: [["latestBalance", "DESC"]],
                limit: 5,
            }),
            Ledger.findAll({
                where: { userId },
                order: [["latestBalance", "ASC"]],
                limit: 5,
            }),
            Ledger.sum("latestBalance", {
                where: {
                    userId,
                    latestBalance: { [Op.gt]: 0 },
                },
            }),
            Ledger.sum("latestBalance", {
                where: {
                    userId,
                    latestBalance: { [Op.lt]: 0 },
                },
            }),
        ]);

        res.json({
            success: true,
            total: transactions.count,
            data: {
                recentTransactions: transactions.rows,
                highestLedgers,
                lowestLedgers,
                totalPositiveBalance: parseFloat(positiveBalanceSum || 0),
                totalNegativeBalance: parseFloat(negativeBalanceSum || 0),
            },
        });
    } catch (err) {
        console.error("Error in getLatestTransactions:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Server Error",
            error: err.message,
        });
    }
};
