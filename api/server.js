const express = require("express")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors('*'));
const userRoutes = require('./routes/user')
app.use('/users', userRoutes);

app.get('/', (req, res) => res.send("Welcome to the server for the Cookie Quiz!"));



module.exports = app;
