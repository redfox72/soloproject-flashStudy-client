const mongoose = require('../db');

const playerSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        },
        completed: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes',
        }]
    }
);

module.exports = mongoose.model('Players', playerSchema);