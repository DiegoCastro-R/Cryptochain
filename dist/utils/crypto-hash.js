"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const cryptoHash = (...inputs) => {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));
    return hash.digest('hex');
};
exports.cryptoHash = cryptoHash;
