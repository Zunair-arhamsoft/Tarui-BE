
const sequelize = require("../../api/db");
const BillSetting = require('./BillSetting');
const Ledger = require('./Ledger');
const Product = require('./Product');
const Transaction = require('./Transaction');
const User = require('./User');

const models = {
    Ledger,
    Transaction,
    User,
    Product,
    BillSetting
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    ...models,
    sequelize,
};
