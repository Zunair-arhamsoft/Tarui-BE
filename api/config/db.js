const { Sequelize } = require('sequelize');
const { dbURL } = require('./vars');

const sequelize = new Sequelize(dbURL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    }
});

module.exports = sequelize;