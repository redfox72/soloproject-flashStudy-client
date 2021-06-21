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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./db"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = process.env.PORT || 3001;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(router_1.default);
app.get('*', (_, res) => {
    res.status(404).send('Page not found');
});
app.post('*', (_, res) => {
    res.status(404).send('Page not found');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default();
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
}))();
