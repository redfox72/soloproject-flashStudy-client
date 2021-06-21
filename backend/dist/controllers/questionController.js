"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = __importDefault(require("../models/questions"));
exports.getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQuestions = yield questions_1.default.find();
        res.status(200).send(allQuestions);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
exports.getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionById = yield questions_1.default.findById(req.params['id']);
        res.status(200).send(questionById);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
exports.addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = yield questions_1.default.create(req.body);
        res.status(201).send(newQuestion._id);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
