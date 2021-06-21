"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Users',
        required: true,
    },
    completed: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Quizzes',
            required: true,
        }],
});
const Players = mongoose_1.model('Players', playerSchema);
exports.default = Players;
