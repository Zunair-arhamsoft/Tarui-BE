
const sequelize = require('../../config/db');
const Ledger = require('./Ledger');
const Transaction = require('./Transaction');
const User = require('./User');

const models = {
    Ledger,
    Transaction,
    User
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
