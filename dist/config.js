"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINE_RATE = exports.GENESIS_DATA = void 0;
const MINE_RATE = 1000;
exports.MINE_RATE = MINE_RATE;
const INITIAL_DIFFICULTY = 3;
const GENESIS_DATA = {
    timestamp: Date.now(),
    lastHash: '-----',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};
exports.GENESIS_DATA = GENESIS_DATA;
