let expect = require('chai').expect;
let mathEnforcer = require('../04. Math Enforcer.js');

describe('mathEnforcer tests', function () {

    describe('addFive function', function () {

        it('should return undefined if parameter is not a number', function () {
            expect(mathEnforcer.addFive('test')).to.equal(undefined);
        });

        it('should return correctly', function () {
            expect(mathEnforcer.addFive(5)).to.equal(10);
        });

        it('should return correctly with a floating point parameter', function () {
            expect(mathEnforcer.addFive(5.5)).to.equal(10.5);
        });

        it('should return correctly with negative parameter', function () {
            expect(mathEnforcer.addFive(-5.5)).to.equal(-0.5);
        });

    });

    describe('subtractTen function', function () {

        it('should return undefined if parameter is not a number', function () {
            expect(mathEnforcer.subtractTen('test')).to.equal(undefined);
        });

        it('should return correctly', function () {
            expect(mathEnforcer.subtractTen(11)).to.equal(1);
        });

        it('should return correctly with a floating point', function () {
            expect(mathEnforcer.subtractTen(11.5)).to.equal(1.5);
        });

        it('should return correctly with negative parameter', function () {
            expect(mathEnforcer.subtractTen(-5.5)).to.equal(-15.5);
        });
    });

    describe('sum function', function () {

        it('should return undefined if first parameter is not a number', function () {
            expect(mathEnforcer.sum('test', 1)).to.equal(undefined);
        });

        it('should return undefined if second parameter is not a number', function () {
            expect(mathEnforcer.sum(1,'test')).to.equal(undefined);
        });

        it('should return correctly', function () {
            expect(mathEnforcer.sum(11, 10)).to.equal(21);
        });

        it('should return correctly', function () {
            expect(mathEnforcer.sum(11.5, 10.4)).to.equal(21.9);
        });

        it('should return correctly', function () {
            expect(mathEnforcer.sum(11.5, -10.4)).to.closeTo(1, 1.1);
        });
    });
});