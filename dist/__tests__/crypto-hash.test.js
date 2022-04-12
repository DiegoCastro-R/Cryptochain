"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('cryptoHash', () => {
    it('should generate SHA-256 hashed output', () => {
        expect((0, utils_1.cryptoHash)('foo')).
            toEqual("b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b");
    });
    it('produces the same hash with the same input arguments in any order', () => {
        expect((0, utils_1.cryptoHash)('one', 'two', 'three'))
            .toEqual((0, utils_1.cryptoHash)('three', 'one', 'two'));
    });
});
