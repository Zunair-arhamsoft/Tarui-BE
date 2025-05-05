const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'user_product_unique_constraint',
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: 'user_product_unique_constraint',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'user_product_unique_constraint',
    },
});

Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = Product;
