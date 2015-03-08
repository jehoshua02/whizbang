var Validator = {

  isString: function (value) {
    return typeof value === 'string';
  },

  isBool: function (value) {
    return typeof value === 'boolean';
  },

  isFunction: function (value) {
    return typeof value === 'function';
  },

  isNumber: function (value) {
    return typeof value === 'number' && !isNaN(value);
  },

  isInteger: function (value) {
    return this.isNumber(value) && value % 1 === 0;
  },

  isFloat: function (value) {
    return this.isNumber(value) && !this.isInteger(value) && Math.abs(value) !== Infinity;
  }

};

module.exports = Validator;
