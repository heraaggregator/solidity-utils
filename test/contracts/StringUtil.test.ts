import { expect } from '../../src/prelude';

const StringUtilTest = artifacts.require('StringUtilTest');

describe('StringUtil', async () => {
    const uint256TestValue = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    const uint128TestValue = '0x00000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    const veryLongArray = '0xffffffffffffffafafafbcbcbcbcbdeded' + 'aa'.repeat(50);
    const extremelyLongArray = '0x' + '0f'.repeat(1000);
    const emptyBytes = '0x';
    const singleByte = '0xaf';

    const initContext = async () => {
        const stringUtilTest = await StringUtilTest.new();
        return { stringUtilTest };
    };

    let context: Awaited<ReturnType<typeof initContext>> = undefined!;

    before(async () => {
        context = await initContext();
    });

    describe('Validity', async () => {
        it('Uint 256', () => test(uint256TestValue));

        it('Uint 128', () => test(uint128TestValue));

        it('Very long byte array', () => testBytes(veryLongArray));

        it('Extremely long byte array', () => testBytes(extremelyLongArray));

        it.skip('Empty bytes. Skipped until resolved: https://github.com/ChainSafe/web3.js/issues/4512', () => testBytes(emptyBytes));

        it('Single byte', () => testBytes(singleByte));

        const test = async (value: string) => {
            const result = await context.stringUtilTest.toHex(value, 0);
            const naiveResult = await context.stringUtilTest.toHexNaive(value, 0);
            expect(result.toLowerCase()).to.be.equal(value.toLowerCase());
            expect(result.toLowerCase()).to.be.equal(naiveResult.toLowerCase());
        };

        const testBytes = async (value: string) => {
            const result = await context.stringUtilTest.toHexBytes(value, 0);
            const naiveResult = await context.stringUtilTest.toHexNaiveBytes(value, 0);
            expect(result.toLowerCase()).to.be.equal(value.toLowerCase());
            expect(result.toLowerCase()).to.be.equal(naiveResult.toLowerCase());
        };
    });

    describe('Gas usage @skip-on-coverage', async () => {
        it('Uint 256', () => testGasUint256(uint256TestValue, 843));

        it('Uint 256 naive', () => testGasNaiveUint256(uint256TestValue, 21335));

        it('Uint 256 as bytes', () => testGasBytes(uint256TestValue, 722));

        it('Uint 256 as bytes naive', () => testGasNaiveBytes(uint256TestValue, 21214));

        it('Uint 128', () => testGasUint256(uint128TestValue, 843));

        it('Uint 128 naive', () => testGasNaiveUint256(uint128TestValue, 21335));

        it('Very long byte array gas', () => testGasBytes(veryLongArray, 1772));

        it('Very long byte array gas naive', () => testGasNaiveBytes(veryLongArray, 43766));

        it('Extremely long byte array gas', () => testGasBytes(extremelyLongArray, 17015));

        it('Extremely long byte array gas naive', () => testGasNaiveBytes(extremelyLongArray, 644983));

        it('Empty bytes', () => testGasBytes(emptyBytes, 197));

        it('Empty bytes naive', () => testGasNaiveBytes(emptyBytes, 594));

        it('Single byte', () => testGasBytes(singleByte, 722));

        it('Single byte naive', () => testGasNaiveBytes(singleByte, 988));

        const testGasUint256 = async (value: string, expectedGas: number) => {
            await context.stringUtilTest.toHex(value, expectedGas);
        };

        const testGasBytes = async (value: string, expectedGas: number) => {
            await context.stringUtilTest.toHexBytes(value, expectedGas);
        };

        const testGasNaiveUint256 = async (value: string, expectedGas: number) => {
            await context.stringUtilTest.toHexNaive(value, expectedGas);
        };

        const testGasNaiveBytes = async (value: string, expectedGas: number) => {
            await context.stringUtilTest.toHexNaiveBytes(value, expectedGas);
        };
    });
});
