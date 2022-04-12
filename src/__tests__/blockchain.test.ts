import { Block } from '../block'
import { Blockchain } from '../blockchain'

describe('Blockchain', () => {
    let blockchain = new Blockchain()


    beforeEach(() => {
        blockchain = new Blockchain()
    })

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block to the chain', () => {
        const newData = 'foo bar'
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    })

    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                //@ts-expect-error
                blockchain.chain[0] = { data: 'fake-genesis' }

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            });
        })
        beforeEach(() => {
            blockchain.addBlock({ data: 'Bears' });
            blockchain.addBlock({ data: 'Beets' });
            blockchain.addBlock({ data: 'Battlestar Galactica' })

        })
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
        })
        describe('and the chain contains multiple invalid blocks', () => {
            it('returns false', () => {
                blockchain.chain[2].data = 'some-bad-and-evil-data';

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })

        describe('and the chain does not contain any invalid blocks', () => {
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        })
    })


})

