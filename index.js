const express = require('express');
const mongoose = require("mongoose");
const app = require("./src/app.js");
const port = process.env.port || 3003

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();

// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
