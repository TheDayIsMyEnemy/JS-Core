let expect = require('chai').expect;
let StringBuilder = require('../string-builder.js');

describe('StringBuilder tests', function () {
   let sb;

    it('initialization does not throw', function () {
        let initEmpty = () => sb = new StringBuilder();
        expect(initEmpty).to.not.throw();
        let initParam = () => sb = new StringBuilder('hello');
        expect(initParam).to.not.throw();
    });

    it('invalid constructor parameter', function () {
        let willThrow = () => sb = new StringBuilder(5);
        expect(willThrow).to.throw();
    });

   describe('with empty constructor', function () {
      beforeEach(function () {
            sb = new StringBuilder();
      });

      it('has all properties', function () {
          expect(sb.hasOwnProperty('_stringArray')).to.equal(true,"Missing _stringArray property");
      });

      it('has functions attached to prototype', function () {
         expect(Object.getPrototypeOf(sb)
             .hasOwnProperty('append')).to.equal(true);
          expect(Object.getPrototypeOf(sb)
              .hasOwnProperty('prepend')).to.equal(true);
          expect(Object.getPrototypeOf(sb)
              .hasOwnProperty('insertAt')).to.equal(true);
          expect(Object.getPrototypeOf(sb)
              .hasOwnProperty('remove')).to.equal(true);
          expect(Object.getPrototypeOf(sb)
              .hasOwnProperty('toString')).to.equal(true);
      });

      it('must initialize data with an empty array', function () {
         expect(sb._stringArray instanceof Array).to.equal(true);
          expect(sb._stringArray.length).to.equal(0);
      });
   });

   describe('constructor with parameter', function () {
       let testVar = 'test';
       let str = 'unit';
       beforeEach(function () {
           sb = new StringBuilder(testVar);
       });

       it('must initialize data with a string array', function () {
           expect(sb._stringArray instanceof Array).to.equal(true);
           compareArray(sb._stringArray, Array.from(testVar));
       });

       it('appends correctly', function () {
           sb.append(str);
           compareArray(sb._stringArray, Array.from(testVar + str));
       });

       it('prepends correctly', function () {
           sb.prepend(str);
           compareArray(sb._stringArray, Array.from(str + testVar));
       });

       it('it inserts correctly', function () {
           sb.insertAt(str, 0);
           compareArray(sb._stringArray, Array.from(str + testVar));
       });

       it('it removes correctly', function () {
           sb.remove(0, 2);
           compareArray(sb._stringArray, Array.from('st'));
       });

       it('toString returns correctly', function () {
            expect(sb.toString()).to.equal(testVar);
       });


   });

   it('should throw an error if arguments different than string', function () {

   });

   function compareArray(source, expected) {
       expect(source.length).to.equal(expected.length);
       for(let i=0; i< source.length; i++){
           expect(source[i]).to.equal(expected[i], 'Element ' + i + 'mismatch!');
       }
   }

});