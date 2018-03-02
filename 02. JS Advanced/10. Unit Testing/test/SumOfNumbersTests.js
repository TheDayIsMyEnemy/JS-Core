let expect = require('chai').expect;
let assert = require('chai').assert;
let sum = require('../04. Sum of Numbers.js');


describe('Sum Of Numbers Tests', function () {
    it('Should return 10 for [5,5]', function () {
        let expectedSum = 10;
        let actualSum = sum([5,5]);
        expect(actualSum).to.equal(expectedSum);
    })
    it('Should return 1 for [1]', function () {
        let expectedSum = 1;
        let actualSum = sum([1]);
        expect(actualSum).to.equal(expectedSum);
    })
    it('Should return 0 for []', function () {
        let expectedSum = 0;
        let actualSum = sum([]);
        expect(actualSum).to.equal(expectedSum);
    })
    it('Should return 3.14 for [-2,5,0.14]', function () {
        let expectedSum = 3.14;
        let actualSum = sum([-2,5,0.14]);
        expect(actualSum).to.equal(expectedSum);
    })
    it('Should return NaN for ["invalid data"]', function () {
        let expectedSum = NaN;
        let actualSum = sum(["invalid data"]);
        assert.isNaN(actualSum);
    })
})



