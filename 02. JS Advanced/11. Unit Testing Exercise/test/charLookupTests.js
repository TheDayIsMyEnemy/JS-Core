let expect = require('chai').expect;
let lookupChar = require('../03. Char Lookup.js');

describe('lookupChar tests', function () {

    it('should return undefined if first parameter is not a string', function () {
       expect(lookupChar(1, 2)).to.equal(undefined);
    });

    it('should return undefined if second parameter is not a int', function () {
        expect(lookupChar('test', '2')).to.equal(undefined);
    });

    it('should return undefined if second parameter is a floating point number', function () {
        expect(lookupChar('test', 3.14)).to.equal(undefined);
    });

    it('should return "Incorrect index" if index is bigger than string length', function () {
        expect(lookupChar('test', 5)).to.equal('Incorrect index');
    });

    it('should return "Incorrect index" if index is equal to string length', function () {
        expect(lookupChar('test', 4)).to.equal('Incorrect index');
    });

    it('should return "Incorrect index" if index is negative number', function () {
        expect(lookupChar('test', -1)).to.equal('Incorrect index');
    });

    it('should return correctly a char', function () {
        expect(lookupChar('test',1)).to.equal('e')
    })
});