const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");
require("dotenv").config();
const authRoutes = require("./route/auth.route");



mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"));

const app = express();
const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);

