require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const routes = require("./api/routes/index");
const { port } = require('./config/vars');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/', routes);

sequelize.sync().then(() => {
    console.log('Database connected!');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});