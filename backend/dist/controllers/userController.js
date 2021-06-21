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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const SECRET_KEY = process.env.SECRET_KEY || 'This is first trial authentication';
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        res.status(409).send({ error: '409', message: 'User already exists' });
        return;
    }
    try {
        if (password === '')
            throw new Error();
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
        const { _id } = newUser;
        const accessToken = jsonwebtoken_1.default.sign({ _id }, SECRET_KEY);
        res.status(201).send({ _id, accessToken });
    }
    catch (error) {
        res.status(400).send({ error, message: 'Could not create user' });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: email });
        const { _id } = user;
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const validatedPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validatedPassword)
            throw new Error();
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send({ _id, accessToken });
    }
    catch (error) {
        res.status(401).send({ error, message: 'Username or password is incorrect' });
    }
});
exports.profile = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, firstName, lastName, email } = res.locals.user;
        const user = { _id, firstName, lastName, email };
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send({ error, message: 'User not found' });
    }
});
exports.logout = (req, res) => {
};
