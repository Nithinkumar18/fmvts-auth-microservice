
const express = require('express');
require('dotenv').config();
const logger = require('./src/logger/logger');
const info = require('./src/constants/responseInfo');

const app = express();
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());
app.use('/v1',authRoutes);
const PORT = process.env.PORT;
app.listen(PORT,() => {
    logger.info(`${info.SERVICE_NAME} started on PORT ${PORT} 🔑`);
})