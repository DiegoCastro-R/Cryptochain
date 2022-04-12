import { Block } from './block'
class Blockchain {
    chain: Block[] = [Block.genesis()];
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }: any): void {
        const newBlock = Block.mineBlock({ lastBlock: this.chain[this.chain.length - 1], data });
        this.chain.push(newBlock);
    }
}

export { Blockchain }