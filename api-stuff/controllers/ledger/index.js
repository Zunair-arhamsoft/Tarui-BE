const { Op } = require("sequelize");
const { Ledger, Transaction } = require("../../models");


exports.getLedgers = async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = {
        userId: req.user.id,
        ...(search && {
            name: {
                [Op.iLike]: `%${search}%`,
            },
        }),
    };
    try {
        const ledgers = await Ledger.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
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

exports.getLedgerTransactionsByDate = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const whereClause = {
        userId: req.user.id,
        ledgerId: id,
        ...(startDate && endDate && {
            createdAt: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
        }),
        ...(startDate && !endDate && {
            createdAt: {
                [Op.gte]: new Date(startDate),
            },
        }),
        ...(!startDate && endDate && {
            createdAt: {
                [Op.lte]: new Date(endDate),
            },
        }),
    };

    try {
        const ledger = await Ledger.findOne({
            where: { id, userId: req.user.id },
        });

        if (!ledger) {
            return res.status(404).json({ message: "Ledger not found" });
        }

        const transactions = await Transaction.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
        });

        res.json({
            ledgerId: id,
            ledger,
            transactions,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
