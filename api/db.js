
const { Sequelize } = require('sequelize');


let sequelize;
const { dbName, dbUser, dbPass, dbHost, nodeEnv, dbURL } = require('./vars');
import pg from 'pg';

if (nodeEnv === 'production') {
    // Live DB
    sequelize = new Sequelize(dbURL, {
        dialect: 'postgres',
        dialectModule: pg,
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