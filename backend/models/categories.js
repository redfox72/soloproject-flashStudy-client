const mongoose = require('../db');

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model('Categories', categorySchema);