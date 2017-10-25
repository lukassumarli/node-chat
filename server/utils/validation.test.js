const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let inputText = 123;
        let validating = isRealString(inputText);

        expect(validating).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let inputText = '     ';
        let validating = isRealString(inputText);

        expect(validating).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let inputText = '  the text   ';
        let validating = isRealString(inputText);

        expect(validating).toBe(true);
    });
})