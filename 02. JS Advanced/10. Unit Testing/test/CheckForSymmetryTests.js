let expect = require('chai').expect;
let isSymmetric = require('../05. Check for Symmetry.js');

describe('isSymmetric tests', function () {
   it('Should return false for [1,2]', function () {
       expect(isSymmetric([1,2])).to.be.equal(false);
   })
    it('Should return true for [1,2,1]', function () {
        expect(isSymmetric([1,2,1])).to.be.equal(true);
    })
    it('Should return true for [-1,2,-1]', function () {
        expect(isSymmetric([-1,2,-1])).to.be.equal(true);
    })
    it('Should return true for []', function () {
        expect(isSymmetric([])).to.be.equal(true);
    })
    it('Should return true for [1,"valid",1]', function () {
        expect(isSymmetric([1,"valid",1])).to.be.equal(true);
    })
    it('Should return true for [1]', function () {
        expect(isSymmetric([1])).to.be.equal(true);
    })
    it('Should return true for 1', function () {
        expect(isSymmetric(1)).to.be.equal(false);
    })
    it("should return true for [5,'hi',{a:5},new Date(),{a:5},'hi',5] ", function() {
        let symmetric = isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5] );
        expect(symmetric).to.be.equal(true);
    });
})