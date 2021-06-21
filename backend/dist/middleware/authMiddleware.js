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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const SECRET_KEY = process.env.SECRET_KEY || 'Am I secure to send data';
exports.authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
        res.sendStatus(403);
        return;
    }
    const accessToken = authHeaders.split(' ')[1];
    try {
        const { _id } = jsonwebtoken_1.default.verify(accessToken, SECRET_KEY);
        const user = yield user_1.default.findOne({ _id });
        if (!user) {
            res.sendStatus(401);
            return;
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
});
