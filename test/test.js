require('should');

describe('Validator', function () {
  var Validator = require('../lib/Validator');
  describe('.isString(value)', function () {
    it('should return true only for strings', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ 'string' ]
        },
        {
          expected: false,
          values: [
            true, false,
            /^regex$/,
            {},
            [],
            function () {},
            null, undefined,
            1, 1.1, NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isString(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });

  describe('.isBoolean(value)', function () {
    it('should return true only for booleans', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ true, false ]
        },
        {
          expected: false,
          values: [
            'string',
            /^regex$/,
            {},
            [],
            function () {},
            null, undefined,
            1, 1.1, NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isBool(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });

  describe('.isFunction(value)', function () {
    it('should return true only for functions', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ function () {} ]
        },
        {
          expected: false,
          values: [
            'string',
            true, false,
            /^regex$/,
            {},
            [],
            null, undefined,
            1, 1.1, NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isFunction(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });

  describe('.isNumber(value)', function () {
    it('should return true only for numbers', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ 1, 1.1, Infinity, -Infinity, 0 ]
        },
        {
          expected: false,
          values: [
            'string',
            true, false,
            /^regex$/,
            {},
            [],
            null, undefined,
            NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isNumber(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });

  describe('.isInteger(value)', function () {
    it('should return true only for integers', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ 1, 2774, 0, -4875 ]
        },
        {
          expected: false,
          values: [
            Infinity, -Infinity,
            1.1,
            'string',
            true, false,
            /^regex$/,
            {},
            [],
            null, undefined,
            NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isInteger(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });

  describe('.isFloat(value)', function () {
    it('should return true only for floats', function () {
      // arrange
      var scenarios = [
        {
          expected: true,
          values: [ 1.1, 3.14, -5.674, 1.50, 1/3 ]
        },
        {
          expected: false,
          values: [
            Infinity, -Infinity,
            1, 2774, 0, -4875,
            'string',
            true, false,
            /^regex$/,
            {},
            [],
            null, undefined,
            NaN
          ]
        }
      ];

      scenarios.forEach(function (scenario) {
        scenario.values.forEach(function (value) {
          // act
          var actual = Validator.isFloat(value);

          // assert
          actual.should.equal(scenario.expected);
        });
      });
    });
  });
});
