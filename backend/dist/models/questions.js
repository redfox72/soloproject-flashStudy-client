"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionScema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Categories',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
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
});
const Questions = mongoose_1.model('Questions', questionScema);
exports.default = Questions;
