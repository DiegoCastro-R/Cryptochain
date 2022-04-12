import { GENESIS_DATA, MINE_RATE } from './config'

import { cryptoHash } from './utils'

interface IBlock {
    timestamp: number,
    lastHash: string
    hash: string
    nonce: number;
    difficulty: number
    data: any
}

class Block {
    timestamp: number;
    lastHash: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: any;

    constructor({ timestamp, lastHash, hash, nonce, difficulty, data }: IBlock) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.data = data;
    }

    static genesis(): Block {
        return new Block(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }: { lastBlock: Block, data: any }): Block {
        let hash: string, timestamp: number;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));


        return new this({
            timestamp,
            lastHash,
            hash: cryptoHash(timestamp, lastHash, data, nonce, difficulty),
            difficulty,
            nonce,
            data
        })
    }

    static adjustDifficulty({ originalBlock, timestamp }: { originalBlock: Block, timestamp: number }): number {
        const { difficulty } = originalBlock;

        if (difficulty < 1) return 1;

        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }


}

export { Block }