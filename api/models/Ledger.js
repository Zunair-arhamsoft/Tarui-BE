const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Ledger = sequelize.define("Ledger", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'user_ledger_unique_constraint',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'user_ledger_unique_constraint',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Ledger.associate = (models) => {
    Ledger.belongsTo(models.User, { foreignKey: "userId" });
    Ledger.hasMany(models.Transaction, { foreignKey: "ledgerId" });
};


module.exports = Ledger;
