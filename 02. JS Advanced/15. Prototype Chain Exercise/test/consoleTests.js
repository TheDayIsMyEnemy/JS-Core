let Console = require('../05. C# Console');
let expect = require('chai').expect;

describe('C# Console tests', function () {

    it('should return a string', function () {
        let str = 'test';
       expect(Console.writeLine(str)).to.equal(str);
    });

    it('should return a json', function () {
       let obj = {name:'test'};
       expect(Console.writeLine(obj)).to.equal(JSON.stringify(obj));
    });

    it('should exchange placeholders correctly', function () {
       let expected = 'Hi from N:1 test lab';
       expect(Console.writeLine('Hi from N:{0} {1} lab','1', 'test')).to.equal(expected);
    });

    it('should throw if first argument not a string', function () {
        let willThrow = () => Console.writeLine(2,'test','test2');
       expect(willThrow).to.throw(TypeError);
    });

    it('should throw if  the number of parameters' +
        ' does not correspond to the number of placeholders', function () {
       let willThrow = () => Console.writeLine('test N: {0} , test N: {1}', 1);
       expect(willThrow).to.throw(RangeError);
    });

    it('should throw with parameters not within the placeholders range', function () {
        let willThrow = () => Console.writeLine('test N: {20}', 'wtf');
        expect(willThrow).to.throw(RangeError);
    });

});