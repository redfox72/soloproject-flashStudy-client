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
Object.defineProperty(exports, "__esModule", { value: true });
const Players = require('../models/players');
exports.checkPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield Players.find({ email: req.params['id'] });
        if (userId) {
            res.status(200).send(userId);
        }
        else {
            const newPlayer = yield Players.create({ email: req.params['id'] });
            res.status(201).send(newPlayer);
        }
    }
    catch (error) {
        res.status(404).send({ error });
    }
});
