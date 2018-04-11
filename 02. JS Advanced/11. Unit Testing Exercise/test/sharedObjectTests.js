let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let sharedObject = require('../05. Shared Object.js');

document.body.innerHTML = `<div id="wrapper">
    <input type="text" id="name">
    <input type="text" id="income">
    </div>`;

describe('sharedObject tests', function () {

    beforeEach(function () {
       sharedObject.name = null;
       sharedObject.income = null;
        $('#name').val('');
        $('#income').val('');
    });
    
    describe('initial values tests', function () {
        it('name should starts with null by default', function () {
            expect(sharedObject.name).to.equal(null);
        });

        it('income should starts with null by default', function () {
            expect(sharedObject.income).to.equal(null);
        });
    });
    
    describe('changeName function', function () {
        it('should not change name if parameter is an empty string', function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.equal(null);
        });

        it('should change name and textbox value correctly', function () {
            sharedObject.changeName('test');
            expect(sharedObject.name).to.equal('test');
            expect($('#name').val()).to.equal('test')
        });
    });

    describe('changeIncome function', function () {
        it('no changes if parameter is negative number', function () {
            sharedObject.changeIncome(-1);
            expect(sharedObject.income).to.equal(null);
        });

        it('no changes if parameter is 0', function () {
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.equal(null);
        });

        it('no changes if parameter is a floating point', function () {
            sharedObject.changeIncome(0.5);
            expect(sharedObject.income).to.equal(null);
        });

        it('should change name and textbox value correctly', function () {
            sharedObject.changeIncome(11);
            expect(sharedObject.income).to.equal(11);
            expect($('#income').val()).to.equal('11')
        });
    });

    describe('updateName function', function () {
        it('should not update name if textbox value is an empty string', function () {
            sharedObject.updateName();
            expect(sharedObject.name).to.equal(null);
        });

        it('should update name', function () {
            sharedObject.changeName('newName');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('newName');
        });

        it('should update name', function () {
            $('#name').val('test1')
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('test1');
        });
    });

    describe('updateIncome function', function () {
        it('should not update if income cannot be parsed to a positive integer', function () {
            $('#income').val('-5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(null);
        });

        it('should not update if income cannot be parsed to a positive integer', function () {
            $('#income').val('test');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(null);
        });

        it('should not update if income cannot be parsed to a positive integer', function () {
            $('#income').val('0.5');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(null);
        });

        it('should not update if income cannot be parsed to a positive integer', function () {
            $('#income').val('0');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(null);
        });

        it('should update correctly', function () {
            //arrange
            $('#income').val('5');
            //act
            sharedObject.updateIncome();
            //assert
            expect(sharedObject.income).to.equal(5);
        });
    });
});