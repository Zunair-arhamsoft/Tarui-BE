const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.associate = (models) => {
    User.hasMany(models.Ledger, { foreignKey: "userId" });
};

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;