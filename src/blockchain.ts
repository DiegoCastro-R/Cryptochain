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

    replaceChain(chain: Block[]): void {
        console.log(chain.length)
        console.log(this.chain.length)
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

    static isValidChain(chain: string | any[]) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, hash, data, nonce, difficulty } = chain[i];
            const actualLastHash = chain[i - 1].hash;


            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if (hash !== validatedHash) return false;


        }

        return true;
    }
}

export { Blockchain }