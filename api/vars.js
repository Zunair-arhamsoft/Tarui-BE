require('dotenv').config();

module.exports = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    dbURL: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV || "development",
}