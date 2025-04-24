const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Transaction = sequelize.define("Transaction", {
    ledgerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Transaction.associate = (models) => {
    Transaction.belongsTo(models.Ledger, { foreignKey: "ledgerId" });
};

module.exports = Transaction;
