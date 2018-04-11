let expect = require('chai').expect;
let isOddOrEven = require('../02.EvenOrOdd.js');

describe('is odd or even tests', function () {

    it('should return undefined if parameter is not a string', function () {
       expect(isOddOrEven(2)).to.equal(undefined);
    });

    it('should return even if parameter length is even', function () {
        expect(isOddOrEven('test')).to.equal('even');
    })

    it('should return odd if parameter length is odd', function () {
        expect(isOddOrEven('1')).to.equal('odd');
    })

});