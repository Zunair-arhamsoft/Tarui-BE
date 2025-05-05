const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Transaction = sequelize.define("Transaction", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ledgerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM(
            "Buy",
            "Sell",
            "Open Sell",
            "Return",
            "Breakage",
            "Credit Amount",
            "Debit Amount"
        ),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    runningBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Cumulative balance after this transaction"
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    selectedProducts: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
});

Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: "userId" });
    Transaction.belongsTo(models.Ledger, { foreignKey: "ledgerId" });
};

module.exports = Transaction;
