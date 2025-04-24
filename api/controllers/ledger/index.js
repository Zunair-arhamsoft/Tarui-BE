const { Ledger, Transaction } = require("../../models");


exports.getLedgers = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const ledgers = await Ledger.findAndCountAll({
            where: { userId: req.user.id },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.json({
            total: ledgers.count,
            pages: Math.ceil(ledgers.count / limit),
            currentPage: parseInt(page),
            data: ledgers.rows,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.getLedgerDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const ledger = await Ledger.findOne({
            where: { id, userId: req.user.id },
            include: [{ model: Transaction }],
        });

        if (!ledger) {
            return res.status(404).json({ message: "Ledger not found" });
        }

        res.json(ledger);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.createLedger = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Ledger name is required" });
        }

        const ledger = await Ledger.create({
            name,
            description,
            userId: req.user.id,
        });

        res.status(201).json({ message: "Ledger created", ledger });
    } catch (err) {
        console.error("Error creating ledger:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
