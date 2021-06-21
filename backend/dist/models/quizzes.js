"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const quizSchema = new mongoose_1.Schema({
    categoeyId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Categories',
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
    questions: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Questions',
            required: true,
        }],
});
const Quizzes = mongoose_1.model('Quizzes', quizSchema);
exports.default = Quizzes;
