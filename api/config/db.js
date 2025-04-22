const { Sequelize } = require('sequelize');
// const { dbURL } = require('./vars');

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    }
});

module.exports = sequelize;