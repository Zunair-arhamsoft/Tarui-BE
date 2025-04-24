const { Sequelize } = require('sequelize');
const { dbURL } = require('./vars');

// Live DB
// const sequelize = new Sequelize(dbURL, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: { require: true, rejectUnauthorized: false }
//     }
// });


// Local DB
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});


module.exports = sequelize;