const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
let cardController = require('./controllers/cardController');

let app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server listening at port 3000'));

app.use('/card', cardController)
