
const { Sequelize } = require('sequelize');


let sequelize;
const { dbName, dbUser, dbPass, dbHost, nodeEnv, dbURL } = require('./vars');

if (nodeEnv === 'production') {
    // Live DB
    sequelize = new Sequelize(dbURL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
        },
    });
} else {
    // Local DB
    sequelize = new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        dialect: 'postgres',
        logging: false,
    });
}

module.exports = sequelize;