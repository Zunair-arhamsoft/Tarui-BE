require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('../config/db');
const routes = require("./routes/index");
const { port } = require('../config/vars');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/', routes);

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Optionally only in development
        res.send('Database connected and Express is running on Vercel!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).send('Database connection failed');
    }
});


// sequelize.sync().then(() => {
//     console.log('Database connected!');
//     app.listen(port, () => console.log(`Server running on port ${port}`));
// });