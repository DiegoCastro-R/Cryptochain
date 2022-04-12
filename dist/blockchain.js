"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const block_1 = require("./block");
const utils_1 = require("./utils");
class Blockchain {
    chain = [block_1.Block.genesis()];
    constructor() {
        this.chain = [block_1.Block.genesis()];
    }
    addBlock({ data }) {
        const newBlock = block_1.Block.mineBlock({ lastBlock: this.chain[this.chain.length - 1], data });
        this.chain.push(newBlock);
    }
    replaceChain(chain) {
        console.log(chain.length);
        console.log(this.chain.length);
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer.');
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid.');
            return;
        }
        console.log('Replacing blockchain with incoming chain.');
        this.chain = chain;
    }
    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(block_1.Block.genesis())) {
            return false;
        }
        ;
        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data, nonce, difficulty } = chain[i];
            const actualLastHash = chain[i - 1].hash;
            if (lastHash !== actualLastHash)
                return false;
            const validatedHash = (0, utils_1.cryptoHash)(timestamp, lastHash, data, nonce, difficulty);
            if (hash !== validatedHash)
                return false;
        }
        return true;
    }
}
exports.Blockchain = Blockchain;
