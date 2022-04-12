"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const block_1 = require("../block");
const utils_1 = require("../utils");
describe('Block', () => {
    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new block_1.Block({
        timestamp,
        lastHash,
        hash,
        data,
        nonce,
        difficulty
    });
    it('has a timestamp, lastHash, hash, and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });
    describe('genesis()', () => {
        const genesisBlock = block_1.Block.genesis();
        it('returns a Block instance', () => {
            expect(genesisBlock instanceof block_1.Block).toBe(true);
        });
        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(config_1.GENESIS_DATA);
        });
    });
    describe('mineBlock()', () => {
        const lastBlock = block_1.Block.genesis();
        const data = 'mined data';
        const minedBlock = block_1.Block.mineBlock({ lastBlock, data });
        it('returns a Block instance', () => {
            expect(minedBlock instanceof block_1.Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });
        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash)
                .toEqual((0, utils_1.cryptoHash)(minedBlock.timestamp, lastBlock.hash, minedBlock.data, minedBlock.nonce, minedBlock.difficulty));
        });
        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
                .toEqual('0'.repeat(minedBlock.difficulty));
        });
        it('adjusts the difficulty', () => {
            const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1];
            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        });
    });
    describe('adjustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block.', () => {
            expect(block_1.Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + config_1.MINE_RATE - 100
            })).toEqual(block.difficulty + 1);
        });
        it('lowers the difficulty for a slowly mined block.', () => {
            expect(block_1.Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + config_1.MINE_RATE + 100
            })).toEqual(block.difficulty - 1);
        });
        it('has a lower limit of 1', () => {
            block.difficulty = -1;
            expect(block_1.Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + config_1.MINE_RATE + 100
            })).toEqual(1);
        });
    });
});
