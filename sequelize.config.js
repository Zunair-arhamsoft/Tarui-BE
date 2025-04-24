const db = require('./config/db');
const { dbUser, dbPass, dbName, dbHost } = require('./config/vars');

module.exports = {
    development: {
        username: dbUser,
        password: dbPass,
        database: dbName,
        host: dbHost,
        dialect: 'postgres',
    },
    production: {
        // You can configure production similarly
    },
};
