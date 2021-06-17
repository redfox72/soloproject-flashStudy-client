const mongoose = require('../db');

const questionScema = mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Categories',
        },
        question: {
            type: String,
            required: true,
        },
        position: {
            type: Number,
        },
        option1: {
            type: String,
            required: true,
        },
        option2: {
            type: String,
            required: true,
        },
        option3: {
            type: String,
            required: true,
        },
        option4: {
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Questions',questionScema);