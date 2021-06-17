const mongoose = require('../db');

const quizSchema = mongoose.Schema(
    {
        categoeyId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Categories',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        // questions: [{
        //     type: mongoose.Schema.Types.ObjectId, ref: 'Questions'
        // }]
    }
);

module.exports = mongoose.model('Quizzes',quizSchema);