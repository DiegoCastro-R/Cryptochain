import { Block } from './block'
import { cryptoHash } from './utils'

class Blockchain {
    chain: Block[] = [Block.genesis()];
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }: any): void {
        const newBlock = Block.mineBlock({ lastBlock: this.chain[this.chain.length - 1], data });
        this.chain.push(newBlock);
    }

    static isValidChain(chain: Block[]): boolean {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data } = chain[i];
            const actualLastHash = chain[i - 1].hash;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, hash, data);

            if (hash !== validatedHash) return false;
        }
        return true;
    }
}

export { Blockchain }