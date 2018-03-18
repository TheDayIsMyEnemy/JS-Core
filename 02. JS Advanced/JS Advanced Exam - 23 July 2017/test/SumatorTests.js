let expect = require('chai').expect;
let Sumator = require('../scripts/02. Sumator Class');

describe('Sumator tests', function () {
    let sumator;

    beforeEach(function () {
        sumator = new Sumator();
    });

    it('it has all properties', function () {
        expect(sumator.hasOwnProperty('data')).to.equal(true, 'Missing data property');
    });

    it('has functions attached to prototype', function () {
       expect(Object.getPrototypeOf(sumator)
           .hasOwnProperty('add'))
           .to.equal(true, 'Missing add function');

       expect(Object.getPrototypeOf(sumator)
           .hasOwnProperty('sumNums'))
           .to.equal(true, 'Missing sumNums function');

       expect(Object.getPrototypeOf(sumator)
           .hasOwnProperty('removeByFilter'))
           .to.equal(true, 'Missing removeByFilter function');

       expect(Object.getPrototypeOf(sumator)
           .hasOwnProperty('toString'))
           .to.equal(true, 'Missing toString function');
    });

    it('must initialize data to an empty array', function () {
        expect(sumator.data instanceof Array).to.equal(true, 'Data must be of type array');
        expect(sumator.data.length).to.equal(0, 'Data must be initialized empty');
    });

    it('can add a number', function () {
        sumator.add(5);
        expect(sumator.data.length).to.equal(1, 'Element was not added')
    });

    it('can add several items of any type', function () {
        sumator.add(5);
        expect(sumator.data.length).to.equal(1, 'Element was not added');
        sumator.add('test');
        expect(sumator.data.length).to.equal(2, 'Element was not added');
        sumator.add({});
        expect(sumator.data.length).to.equal(3, 'Element was not added');
    });

    it('should return zero if no numbers', function () {
        sumator.add('test');
        expect(sumator.sumNums()).to.equal(0, 'Incorrect sum if no numbers');
    });

    it('correctly sum numbers', function () {
       sumator.add(1);
       sumator.add(2);
        sumator.add(14);
        expect(sumator.sumNums()).to.equal(17,'Did not sum correctly');
    });

    it('correctly filtering numbers when summing', function () {
        sumator.add(5);
        sumator.add(10);
        sumator.add('test');
        sumator.add({});
        expect(sumator.sumNums()).to.equal(15,'Did not filter correctly');
    });

    it('removes by filter correctly', function () {
        sumator.add(5);
        sumator.add(10);
        sumator.add('test');
        sumator.removeByFilter((e) => e === 5);
        expect(sumator.data).to.not.contains(5, 'Element not removed');
    });

    it('returns empty string', function () {
        expect(sumator.toString()).to.equal('(empty)', 'toString does not returns correctly')
    })

    it('returns a string containing all items joined with comma and space', function () {
        sumator.add(5);
        sumator.add('text');
        expect(sumator.toString()).to.equal('5, text', 'toString does not returns correctly');
    });
});