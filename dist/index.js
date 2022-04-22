"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blockchain_1 = require("./blockchain");
//* Create a new express application instance
const app = (0, express_1.default)();
app.use(express_1.default.json());
const blockchain = new blockchain_1.Blockchain();
app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
});
app.post('/api/mine', (req, res) => {
    const block = blockchain.addBlock({ data: req.body.data });
    res.redirect('/api/blocks');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
