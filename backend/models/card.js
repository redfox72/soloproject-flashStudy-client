const mongoose = require('mongoose');

let Card = mongoose.model('Card', {
    name: { type: String },
    prompt: { type: String },
    answer: { type: String },
    myNum: { type: Number }
});

module.exports = { Card };