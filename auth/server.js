
const express = require('express');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth/v1',authRoutes);
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Auth-MicroService started on PORT ${PORT}`);
})