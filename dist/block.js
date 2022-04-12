"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const config_1 = require("./config");
const utils_1 = require("./utils");
class Block {
    timestamp;
    lastHash;
    hash;
    nonce;
    difficulty;
    data;
    constructor({ timestamp, lastHash, hash, nonce, difficulty, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.data = data;
    }
    static genesis() {
        return new Block(config_1.GENESIS_DATA);
    }
    static mineBlock({ lastBlock, data }) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = (0, utils_1.cryptoHash)(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this({
            timestamp,
            lastHash,
            hash: (0, utils_1.cryptoHash)(timestamp, lastHash, data, nonce, difficulty),
            difficulty,
            nonce,
            data
        });
    }
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1)
            return 1;
        if ((timestamp - originalBlock.timestamp) > config_1.MINE_RATE)
            return difficulty - 1;
        return difficulty + 1;
    }
}
exports.Block = Block;
