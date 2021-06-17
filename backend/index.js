require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get('*', (req,res) => {
    res.status(404).send('Page not found');
});

app.post('*', (req,res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));