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
const quizzes_1 = __importDefault(require("../models/quizzes"));
exports.getAllQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allQuizzes = yield quizzes_1.default.find();
        res.status(200).send(allQuizzes);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
exports.getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizById = yield quizzes_1.default.findById(req.params['id']);
        res.status(200).send(quizById);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
exports.addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuiz = yield quizzes_1.default.create(req.body);
        res.status(201).send(newQuiz._id);
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
