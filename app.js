const express = require('express');
const getSnacks = require('./controllers/snacksController');

const app = express();

app.get('/api/snacks', getSnacks);

module.exports = app;
