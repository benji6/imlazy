"use strict";

var _arguments = arguments;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = exports.zip = exports.transpose = exports.takeWhile = exports.take = exports.tail = exports.splitEvery = exports.sort = exports.some = exports.slice = exports.reverse = exports.repeat = exports.remove = exports.reduce = exports.range = exports.prepend = exports.partition = exports.nth = exports.map = exports.makeCircular = exports.length = exports.last = exports.iterate = exports.iterableOf = exports.iterableFrom = exports.intersperse = exports.insertAll = exports.insert = exports.head = exports.flatten = exports.findIndex = exports.find = exports.filter = exports.every = exports.dropWhile = exports.drop = exports.concat = exports.assoc = exports.append = exports.adjust = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _iterator27 = require("babel-runtime/core-js/symbol/iterator");

var _iterator28 = _interopRequireDefault(_iterator27);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var B = function B(a) {
  return function (b) {
    return function (c) {
      return a(b(c));
    };
  };
};
var createIterable = function createIterable(generator) {
  return (0, _freeze2.default)((0, _defineProperty3.default)({}, _iterator28.default, generator));
};
var generatorFromIterable = function generatorFromIterable(xs) {
  return _regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.delegateYield(xs, "t0", 1);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  });
};
var iterableFromIterable = B(createIterable)(generatorFromIterable);
var isIterable = function isIterable(a) {
  return a[_iterator28.default];
};
var curry = function curry(f) {
  return function () {
    for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
      xs[_key] = arguments[_key];
    }

    return xs.length < f.length ? curry(f.bind.apply(f, [null].concat(xs))) : f.apply(undefined, xs);
  };
};

/**
 * Returns a new iterable with the given function applied to the value at the given index
 * @param {Function} f
 * @param {Number} index
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * adjust(x => 10 * x,
 *        1,
 *        range(1, Infinity)) // => iterableOf(1, 20, 3, 4, 5, 6, 7, 8, ...)
 */
var adjust = exports.adjust = curry(function (f, a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee2() {
    var i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            i = a;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 4;
            _iterator = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 18;
              break;
            }

            x = _step.value;

            if (! i--) {
              _context2.next = 13;
              break;
            }

            _context2.next = 11;
            return x;

          case 11:
            _context2.next = 15;
            break;

          case 13:
            _context2.next = 15;
            return f(x);

          case 15:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 18:
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 24:
            _context2.prev = 24;
            _context2.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 27:
            _context2.prev = 27;

            if (!_didIteratorError) {
              _context2.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context2.finish(27);

          case 31:
            return _context2.finish(24);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 20, 24, 32], [25,, 27, 31]]);
  }));
});

/**
 * Returns a new iterable of the given iterable followed by the given value
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * append(4,
 *        [1, 2, 3]) // => iterableOf(1, 2, 3, 4)
 */
var append = exports.append = curry(function (a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.delegateYield(xs, "t0", 1);

          case 1:
            _context3.next = 3;
            return a;

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
});

/**
 * Returns a new iterable with the given value at the given index
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * assoc(2,
 *       42,
 *       range(1, Infinity)) // => iterableOf(1, 2, 42, 4, 5, 6, 7, 8, ...)
 */
var assoc = exports.assoc = curry(function (a, b, xs) {
  return createIterable(_regenerator2.default.mark(function _callee4() {
    var i, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _x;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            i = a;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 4;
            _iterator2 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context4.next = 18;
              break;
            }

            _x = _step2.value;

            if (! i--) {
              _context4.next = 13;
              break;
            }

            _context4.next = 11;
            return _x;

          case 11:
            _context4.next = 15;
            break;

          case 13:
            _context4.next = 15;
            return b;

          case 15:
            _iteratorNormalCompletion2 = true;
            _context4.next = 6;
            break;

          case 18:
            _context4.next = 24;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t0;

          case 24:
            _context4.prev = 24;
            _context4.prev = 25;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 27:
            _context4.prev = 27;

            if (!_didIteratorError2) {
              _context4.next = 30;
              break;
            }

            throw _iteratorError2;

          case 30:
            return _context4.finish(27);

          case 31:
            return _context4.finish(24);

          case 32:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[4, 20, 24, 32], [25,, 27, 31]]);
  }));
});

/**
 * Returns a new iterable of the first given iterable followed by the second given iterable
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * concat([100, 200],
 *        range(1, Infinity)) // => iterableOf(100, 200, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
var concat = exports.concat = curry(function (xs, ys) {
  return createIterable(_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.delegateYield(xs, "t0", 1);

          case 1:
            return _context5.delegateYield(ys, "t1", 2);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
});

/**
 * Returns a new iterable of the given iterable without the first n elements
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * drop(2,
 *      range(1, Infinity)) // => iterableOf(3, 4, 5, 6, 7, 8, 9, 10, ...)
 */
var drop = exports.drop = curry(function (n, xs) {
  return createIterable(_regenerator2.default.mark(function _callee6() {
    var i, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _x2;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            i = n;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context6.prev = 4;
            _iterator3 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context6.next = 14;
              break;
            }

            _x2 = _step3.value;

            if (!(i-- <= 0)) {
              _context6.next = 11;
              break;
            }

            _context6.next = 11;
            return _x2;

          case 11:
            _iteratorNormalCompletion3 = true;
            _context6.next = 6;
            break;

          case 14:
            _context6.next = 20;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](4);
            _didIteratorError3 = true;
            _iteratorError3 = _context6.t0;

          case 20:
            _context6.prev = 20;
            _context6.prev = 21;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 23:
            _context6.prev = 23;

            if (!_didIteratorError3) {
              _context6.next = 26;
              break;
            }

            throw _iteratorError3;

          case 26:
            return _context6.finish(23);

          case 27:
            return _context6.finish(20);

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[4, 16, 20, 28], [21,, 23, 27]]);
  }));
});

/**
 * Returns a new iterable by applying the given function to each value in the given iterable only yielding values when false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * dropWhile(x => x <= 2,
 *           [1, 2, 3, 4, 3, 2, 1]) // => iterableOf(3, 4, 3, 2, 1)
 */
var dropWhile = exports.dropWhile = curry(function (f, xs) {
  return createIterable(_regenerator2.default.mark(function _callee7() {
    var yielding, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _x3;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            yielding = false;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context7.prev = 4;
            _iterator4 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context7.next = 15;
              break;
            }

            _x3 = _step4.value;

            if (!f(_x3)) yielding = true;

            if (!yielding) {
              _context7.next = 12;
              break;
            }

            _context7.next = 12;
            return _x3;

          case 12:
            _iteratorNormalCompletion4 = true;
            _context7.next = 6;
            break;

          case 15:
            _context7.next = 21;
            break;

          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](4);
            _didIteratorError4 = true;
            _iteratorError4 = _context7.t0;

          case 21:
            _context7.prev = 21;
            _context7.prev = 22;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 24:
            _context7.prev = 24;

            if (!_didIteratorError4) {
              _context7.next = 27;
              break;
            }

            throw _iteratorError4;

          case 27:
            return _context7.finish(24);

          case 28:
            return _context7.finish(21);

          case 29:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[4, 17, 21, 29], [22,, 24, 28]]);
  }));
});

/**
 * Applies the given function to each value in the given iterable until that function returns falsy, in which case false is returned. If the iterable is completely traversed and falsy is never returned by the given function then true is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
 * @example
 * every(x => x <= 20,
 *       [1, 2, 3, 4]) // => true
 * every(x => x <= 2,
 *       [1, 2, 3, 4]) // => false
 */
var every = exports.every = curry(function (f, xs) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = (0, _getIterator3.default)(xs), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _x4 = _step5.value;
      if (!f(_x4)) return false;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return true;
});

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns truthy
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * filter(x => x % 2 === 0,
 *        range(1, Infinity)) // => iterableOf(2, 4, 6, 8, 12, 14, 16, 18, ...)
 */
var filter = exports.filter = curry(function (f, xs) {
  return createIterable(_regenerator2.default.mark(function _callee8() {
    var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _x5;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context8.prev = 3;
            _iterator6 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
              _context8.next = 13;
              break;
            }

            _x5 = _step6.value;

            if (!f(_x5)) {
              _context8.next = 10;
              break;
            }

            _context8.next = 10;
            return _x5;

          case 10:
            _iteratorNormalCompletion6 = true;
            _context8.next = 5;
            break;

          case 13:
            _context8.next = 19;
            break;

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](3);
            _didIteratorError6 = true;
            _iteratorError6 = _context8.t0;

          case 19:
            _context8.prev = 19;
            _context8.prev = 20;

            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }

          case 22:
            _context8.prev = 22;

            if (!_didIteratorError6) {
              _context8.next = 25;
              break;
            }

            throw _iteratorError6;

          case 25:
            return _context8.finish(22);

          case 26:
            return _context8.finish(19);

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[3, 15, 19, 27], [20,, 22, 26]]);
  }));
});

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then find returns the value from the iterable and if the end of the iterable is reached with truthy never returned then find returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * find(x => x % 2 === 0,
 *      range(1, Infinity)) // => 2
 * find(x => x === 0,
 *      [1, 2, 3, 4, 5, 6]) // => undefined
 */
var find = exports.find = curry(function (f, xs) {
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = (0, _getIterator3.default)(xs), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _x6 = _step7.value;
      if (f(_x6)) return _x6;
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }
});

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then findIndex returns the index from the iterable and if the end of the iterable is reached with truthy never returned then findIndex returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * findIndex(x => x % 2 === 0,
 *           range(1, Infinity) // => 1
 * findIndex(x => x === 0,
 *           [1, 2, 3]) // => undefined
 */
var findIndex = exports.findIndex = curry(function (f, xs) {
  var i = 0;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = (0, _getIterator3.default)(xs), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _x7 = _step8.value;
      if (f(_x7)) return i;else i++;
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }
});

/**
 * Takes an iterable and recursively unnests any values which are iterables
 * @param {Iterable} xs
 * @return {Iterable}
 * @example flatten([1, [2, [3, [[4]]]], [range(1, Infinity)]) // => iterableOf(1, 2, 4, 4, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
var flatten = exports.flatten = function flatten(xs) {
  return createIterable(_regenerator2.default.mark(function recur() {
    var ys = _arguments.length <= 0 || _arguments[0] === undefined ? xs : _arguments[0];

    var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, y;

    return _regenerator2.default.wrap(function recur$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _iteratorNormalCompletion9 = true;
            _didIteratorError9 = false;
            _iteratorError9 = undefined;
            _context9.prev = 3;
            _iterator9 = (0, _getIterator3.default)(ys);

          case 5:
            if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
              _context9.next = 16;
              break;
            }

            y = _step9.value;

            if (!isIterable(y)) {
              _context9.next = 11;
              break;
            }

            return _context9.delegateYield(recur(y), "t0", 9);

          case 9:
            _context9.next = 13;
            break;

          case 11:
            _context9.next = 13;
            return y;

          case 13:
            _iteratorNormalCompletion9 = true;
            _context9.next = 5;
            break;

          case 16:
            _context9.next = 22;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t1 = _context9["catch"](3);
            _didIteratorError9 = true;
            _iteratorError9 = _context9.t1;

          case 22:
            _context9.prev = 22;
            _context9.prev = 23;

            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }

          case 25:
            _context9.prev = 25;

            if (!_didIteratorError9) {
              _context9.next = 28;
              break;
            }

            throw _iteratorError9;

          case 28:
            return _context9.finish(25);

          case 29:
            return _context9.finish(22);

          case 30:
          case "end":
            return _context9.stop();
        }
      }
    }, recur, this, [[3, 18, 22, 30], [23,, 25, 29]]);
  }));
};

/**
 * Returns the first value from an iterable
 * @param {Iterable} xs
 * @return {Any}
 * @example head(range(1, Infinity)) // => 1
 */
var head = exports.head = function head(_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 1);

  var x = _ref2[0];
  return x;
};

/**
 * Returns a new iterable with the given value inserted at the given index in the given iterable
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * insert(1,
 *        42,
 *        range(1, Infinity)) // => iterableOf(1, 42, 2, 3, 4, 5, 6, 7, 8, ...)
 */
var insert = exports.insert = curry(function (a, b, xs) {
  return createIterable(_regenerator2.default.mark(function _callee9() {
    var i, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _x9;

    return _regenerator2.default.wrap(function _callee9$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            i = a;
            _iteratorNormalCompletion10 = true;
            _didIteratorError10 = false;
            _iteratorError10 = undefined;
            _context10.prev = 4;
            _iterator10 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
              _context10.next = 20;
              break;
            }

            _x9 = _step10.value;

            if (! i--) {
              _context10.next = 13;
              break;
            }

            _context10.next = 11;
            return _x9;

          case 11:
            _context10.next = 17;
            break;

          case 13:
            _context10.next = 15;
            return b;

          case 15:
            _context10.next = 17;
            return _x9;

          case 17:
            _iteratorNormalCompletion10 = true;
            _context10.next = 6;
            break;

          case 20:
            _context10.next = 26;
            break;

          case 22:
            _context10.prev = 22;
            _context10.t0 = _context10["catch"](4);
            _didIteratorError10 = true;
            _iteratorError10 = _context10.t0;

          case 26:
            _context10.prev = 26;
            _context10.prev = 27;

            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }

          case 29:
            _context10.prev = 29;

            if (!_didIteratorError10) {
              _context10.next = 32;
              break;
            }

            throw _iteratorError10;

          case 32:
            return _context10.finish(29);

          case 33:
            return _context10.finish(26);

          case 34:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee9, this, [[4, 22, 26, 34], [27,, 29, 33]]);
  }));
});

/**
 * Returns a new iterable with the values in the first given iterable inserted at the given index in the last given iterable
 * @param {Number} index
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * insertAll(1,
 *           [42, 24, 3],
 *           [1, 2, 3]) // => iterableOf(1, 42, 24, 3, 2, 3)
 */
var insertAll = exports.insertAll = curry(function (a, xs, ys) {
  return createIterable(_regenerator2.default.mark(function _callee10() {
    var i, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _y;

    return _regenerator2.default.wrap(function _callee10$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            i = a;
            _iteratorNormalCompletion11 = true;
            _didIteratorError11 = false;
            _iteratorError11 = undefined;
            _context11.prev = 4;
            _iterator11 = (0, _getIterator3.default)(ys);

          case 6:
            if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
              _context11.next = 19;
              break;
            }

            _y = _step11.value;

            if (! i--) {
              _context11.next = 13;
              break;
            }

            _context11.next = 11;
            return _y;

          case 11:
            _context11.next = 16;
            break;

          case 13:
            return _context11.delegateYield(xs, "t0", 14);

          case 14:
            _context11.next = 16;
            return _y;

          case 16:
            _iteratorNormalCompletion11 = true;
            _context11.next = 6;
            break;

          case 19:
            _context11.next = 25;
            break;

          case 21:
            _context11.prev = 21;
            _context11.t1 = _context11["catch"](4);
            _didIteratorError11 = true;
            _iteratorError11 = _context11.t1;

          case 25:
            _context11.prev = 25;
            _context11.prev = 26;

            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }

          case 28:
            _context11.prev = 28;

            if (!_didIteratorError11) {
              _context11.next = 31;
              break;
            }

            throw _iteratorError11;

          case 31:
            return _context11.finish(28);

          case 32:
            return _context11.finish(25);

          case 33:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee10, this, [[4, 21, 25, 33], [26,, 28, 32]]);
  }));
});

/**
 * Returns a new iterable with the given value interspersed at every other index in the given iterable
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * intersperse(42,
 *             range(1, Infinity)) // => iterableOf(1, 42, 2, 42, 3, 42, 4, 42, ...)
 */
var intersperse = exports.intersperse = curry(function (a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee11() {
    var _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _x10;

    return _regenerator2.default.wrap(function _callee11$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _iteratorNormalCompletion12 = true;
            _didIteratorError12 = false;
            _iteratorError12 = undefined;
            _context12.prev = 3;
            _iterator12 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
              _context12.next = 14;
              break;
            }

            _x10 = _step12.value;
            _context12.next = 9;
            return _x10;

          case 9:
            _context12.next = 11;
            return a;

          case 11:
            _iteratorNormalCompletion12 = true;
            _context12.next = 5;
            break;

          case 14:
            _context12.next = 20;
            break;

          case 16:
            _context12.prev = 16;
            _context12.t0 = _context12["catch"](3);
            _didIteratorError12 = true;
            _iteratorError12 = _context12.t0;

          case 20:
            _context12.prev = 20;
            _context12.prev = 21;

            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }

          case 23:
            _context12.prev = 23;

            if (!_didIteratorError12) {
              _context12.next = 26;
              break;
            }

            throw _iteratorError12;

          case 26:
            return _context12.finish(23);

          case 27:
            return _context12.finish(20);

          case 28:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee11, this, [[3, 16, 20, 28], [21,, 23, 27]]);
  }));
});

/**
 * Returns a new iterable with values identical to the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example interableFrom([1, 2, 3]) // => iterableOf(1, 2, 3)
 */
var iterableFrom = exports.iterableFrom = iterableFromIterable;

/**
 * Returns an iterable of the arguments passed
 * @param {Any} ...values
 * @return {Iterable}
 * @example [...interableOf(1, 2, 3)] // => [1, 2, 3]
 */
var iterableOf = exports.iterableOf = function iterableOf() {
  for (var _len2 = arguments.length, xs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    xs[_key2] = arguments[_key2];
  }

  return iterableFromIterable(xs);
};

/**
 * Returns an infinite iterable with the first value as the given initial value and all other values defined by applying the given function to the previous value
 * @param {f} function
 * @param {Any} initialValue
 * @return {Iterable}
 * @example
 * iterate(x => 2 * x,
 *         1) // => iterableOf(1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, ...)
 */
var iterate = exports.iterate = curry(function (f, a) {
  return createIterable(_regenerator2.default.mark(function _callee12() {
    var x;
    return _regenerator2.default.wrap(function _callee12$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            x = a;
            _context13.next = 3;
            return x;

          case 3:
            if (!true) {
              _context13.next = 8;
              break;
            }

            _context13.next = 6;
            return x = f(x);

          case 6:
            _context13.next = 3;
            break;

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee12, this);
  }));
});

/**
 * Returns the last value in the given iterable
 * @param {Iterable} xs
 * @return {Any}
 * @example last([1, 2, 3]) // => 3
 */
var last = exports.last = function last(xs) {
  return [].concat((0, _toConsumableArray3.default)(xs)).pop();
};

/**
 * Returns the number of elements in the given iterable
 * @param {Iterable} xs
 * @return {Number}
 * @example length(range(1, 100)) // => 100
 */
var length = exports.length = function length(xs) {
  return [].concat((0, _toConsumableArray3.default)(xs)).length;
};

/**
 * Returns a new iterable by infinitely repeating the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example makeCircular([1, 2, 3]) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2, 3, ...)
 */
var makeCircular = exports.makeCircular = function makeCircular(xs) {
  return createIterable(_regenerator2.default.mark(function _callee13() {
    return _regenerator2.default.wrap(function _callee13$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!true) {
              _context14.next = 4;
              break;
            }

            return _context14.delegateYield(xs, "t0", 2);

          case 2:
            _context14.next = 0;
            break;

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee13, this);
  }));
};

/**
 * Returns a new Iterable by applying the given function to every value in the given iterable
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * map(x => 2 * x,
 *     range(1, Infinity)) // => iterableOf(2, 4, 6, 8, 10, 12, 14, 16, 18, ...)
 */
var map = exports.map = curry(function (f, xs) {
  return createIterable(_regenerator2.default.mark(function _callee14() {
    var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _x11;

    return _regenerator2.default.wrap(function _callee14$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _iteratorNormalCompletion13 = true;
            _didIteratorError13 = false;
            _iteratorError13 = undefined;
            _context15.prev = 3;
            _iterator13 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
              _context15.next = 12;
              break;
            }

            _x11 = _step13.value;
            _context15.next = 9;
            return f(_x11);

          case 9:
            _iteratorNormalCompletion13 = true;
            _context15.next = 5;
            break;

          case 12:
            _context15.next = 18;
            break;

          case 14:
            _context15.prev = 14;
            _context15.t0 = _context15["catch"](3);
            _didIteratorError13 = true;
            _iteratorError13 = _context15.t0;

          case 18:
            _context15.prev = 18;
            _context15.prev = 19;

            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }

          case 21:
            _context15.prev = 21;

            if (!_didIteratorError13) {
              _context15.next = 24;
              break;
            }

            throw _iteratorError13;

          case 24:
            return _context15.finish(21);

          case 25:
            return _context15.finish(18);

          case 26:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee14, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));
});

/**
 * Returns the value at the given index in the given iterable, or undefined if no value exists
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * nth(90,
 *     range(1, Infinity)) // => 90
 */
var nth = exports.nth = curry(function (a, xs) {
  var i = a;
  var _iteratorNormalCompletion14 = true;
  var _didIteratorError14 = false;
  var _iteratorError14 = undefined;

  try {
    for (var _iterator14 = (0, _getIterator3.default)(xs), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
      var _x12 = _step14.value;
      if (i-- <= 0) return _x12;
    }
  } catch (err) {
    _didIteratorError14 = true;
    _iteratorError14 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion14 && _iterator14.return) {
        _iterator14.return();
      }
    } finally {
      if (_didIteratorError14) {
        throw _iteratorError14;
      }
    }
  }
});

/**
 * Returns an iterable of two iterables, the first iterable contains every value from the given iterable where the given function returns truthy and teh second iterable contains every value from the given iterable where the given function returns falsy
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * partition(x => x % 2 === 0,
 *           [1, 2, 3, 4]) // => iterableOf(iterableOf(2, 4), iterableOf(1, 3))
*/
var partition = exports.partition = curry(function (f, xs) {
  return createIterable(_regenerator2.default.mark(function _callee15() {
    var listA, listB, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, _x13;

    return _regenerator2.default.wrap(function _callee15$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            listA = [];
            listB = [];
            _iteratorNormalCompletion15 = true;
            _didIteratorError15 = false;
            _iteratorError15 = undefined;
            _context16.prev = 5;

            for (_iterator15 = (0, _getIterator3.default)(xs); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
              _x13 = _step15.value;

              if (f(_x13)) listA.push(_x13);else listB.push(_x13);
            }
            _context16.next = 13;
            break;

          case 9:
            _context16.prev = 9;
            _context16.t0 = _context16["catch"](5);
            _didIteratorError15 = true;
            _iteratorError15 = _context16.t0;

          case 13:
            _context16.prev = 13;
            _context16.prev = 14;

            if (!_iteratorNormalCompletion15 && _iterator15.return) {
              _iterator15.return();
            }

          case 16:
            _context16.prev = 16;

            if (!_didIteratorError15) {
              _context16.next = 19;
              break;
            }

            throw _iteratorError15;

          case 19:
            return _context16.finish(16);

          case 20:
            return _context16.finish(13);

          case 21:
            _context16.next = 23;
            return iterableFromIterable(listA);

          case 23:
            _context16.next = 25;
            return iterableFromIterable(listB);

          case 25:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee15, this, [[5, 9, 13, 21], [14,, 16, 20]]);
  }));
});

/**
 * Returns a new iterable with the given value prepended to the given iterable
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * prepend(42,
 *         range(1, Infinity)) // => iterableOf(42, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
var prepend = exports.prepend = curry(function (a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee16() {
    return _regenerator2.default.wrap(function _callee16$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return a;

          case 2:
            return _context17.delegateYield(xs, "t0", 3);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee16, this);
  }));
});

/**
 * Returns a new iterable starting with the first given value and either descending or ascending in integer steps until the yielded value is equal to the second given value
 * @param {Number} startFrom
 * @param {Number} endAt
 * @return {Iterable}
 * @example
 * range(1, 3)) // => iterableOf(1, 2, 3)
 * range(1, Infinity)) // => iterableOf(1, 2, 3, 4, 5, 6, 7, 8, ...)
 * range(-1, -Infinity)) // => iterableOf(-1, -2, -3, -4, -5, -6, -7, -8, ...)
 */
var range = exports.range = curry(function (a, b) {
  return createIterable(_regenerator2.default.mark(function _callee17() {
    var n;
    return _regenerator2.default.wrap(function _callee17$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            n = a;

            if (!(n < b)) {
              _context18.next = 9;
              break;
            }

          case 2:
            if (!(n <= b)) {
              _context18.next = 7;
              break;
            }

            _context18.next = 5;
            return n++;

          case 5:
            _context18.next = 2;
            break;

          case 7:
            _context18.next = 14;
            break;

          case 9:
            if (!(n >= b)) {
              _context18.next = 14;
              break;
            }

            _context18.next = 12;
            return n--;

          case 12:
            _context18.next = 9;
            break;

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee17, this);
  }));
});

/**
 * Returns a value by applying the given function with the accumulated value (starting with the given initialValue) and the current value for every value in the given iterable. The value returned from each call to the given function becomes the accumulated value for the next time it is called
 * @param {f} function
 * @param {Any} initialValue
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * reduce((acc, val) => acc + val,
 *        0,
 *        [1, 2, 3, 4]) // => 10
 */
var reduce = exports.reduce = curry(function (f, a, xs) {
  var acc = a;
  var _iteratorNormalCompletion16 = true;
  var _didIteratorError16 = false;
  var _iteratorError16 = undefined;

  try {
    for (var _iterator16 = (0, _getIterator3.default)(xs), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
      var _x14 = _step16.value;
      acc = f(acc, _x14);
    }
  } catch (err) {
    _didIteratorError16 = true;
    _iteratorError16 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion16 && _iterator16.return) {
        _iterator16.return();
      }
    } finally {
      if (_didIteratorError16) {
        throw _iteratorError16;
      }
    }
  }

  return acc;
});

/**
 * Returns an iterable of the given iterable, excluding values from the given index for the given count
 * @param {Number} index
 * @param {Number} count
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * remove(2,
 *        4,
 *        range(1, Infinity)) // => iterableOf(1, 2, 7, 8, 9, 10, 11, 12, ...)
 */
var remove = exports.remove = curry(function (a, b, xs) {
  return createIterable(_regenerator2.default.mark(function _callee18() {
    var i, j, yielding, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, _x15;

    return _regenerator2.default.wrap(function _callee18$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            i = a;
            j = b;
            yielding = true;
            _iteratorNormalCompletion17 = true;
            _didIteratorError17 = false;
            _iteratorError17 = undefined;
            _context19.prev = 6;
            _iterator17 = (0, _getIterator3.default)(xs);

          case 8:
            if (_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done) {
              _context19.next = 20;
              break;
            }

            _x15 = _step17.value;

            if (! i--) yielding = false;

            if (!yielding) {
              _context19.next = 16;
              break;
            }

            _context19.next = 14;
            return _x15;

          case 14:
            _context19.next = 17;
            break;

          case 16:
            if (! --j) yielding = true;

          case 17:
            _iteratorNormalCompletion17 = true;
            _context19.next = 8;
            break;

          case 20:
            _context19.next = 26;
            break;

          case 22:
            _context19.prev = 22;
            _context19.t0 = _context19["catch"](6);
            _didIteratorError17 = true;
            _iteratorError17 = _context19.t0;

          case 26:
            _context19.prev = 26;
            _context19.prev = 27;

            if (!_iteratorNormalCompletion17 && _iterator17.return) {
              _iterator17.return();
            }

          case 29:
            _context19.prev = 29;

            if (!_didIteratorError17) {
              _context19.next = 32;
              break;
            }

            throw _iteratorError17;

          case 32:
            return _context19.finish(29);

          case 33:
            return _context19.finish(26);

          case 34:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee18, this, [[6, 22, 26, 34], [27,, 29, 33]]);
  }));
});

/**
 * Returns a new iterable where every value is the given value and there are as many values as the given count
 * @param {Number} value
 * @param {Number} count
 * @return {Iterable}
 * @example
 * const repeat42 = repeat(42)
 * repeat42(3)) // => iterableOf(42, 42, 42)
 * repeat42(Infinity)) // => iterableOf(42, 42, 42, 42, 42, 42, 42, 42, 42...)
 */
var repeat = exports.repeat = curry(function (a, b) {
  return createIterable(_regenerator2.default.mark(function _callee19() {
    var x;
    return _regenerator2.default.wrap(function _callee19$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            x = b;

          case 1:
            if (! x--) {
              _context20.next = 6;
              break;
            }

            _context20.next = 4;
            return a;

          case 4:
            _context20.next = 1;
            break;

          case 6:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee19, this);
  }));
});

/**
 * Returns a new iterable which is the reverse of the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example reverse([1, 2, 3]) // => iterableOf(3, 2, 1)
 */
var reverse = exports.reverse = function reverse(xs) {
  return iterableFromIterable([].concat((0, _toConsumableArray3.default)(xs)).reverse());
};

/**
 * Returns an iterable of the given iterable starting at the given startIndex and ending one before the given endIndex
 * @param {Number} startIndex
 * @param {Number} endIndex
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * slice(2,
 *       4,
 *       range(1, Infinity)) // => iterableOf(3, 4)
 */
var slice = exports.slice = curry(function (a, b, xs) {
  return createIterable(_regenerator2.default.mark(function _callee20() {
    var i, j, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, _x16;

    return _regenerator2.default.wrap(function _callee20$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            i = a;
            j = b;
            _iteratorNormalCompletion18 = true;
            _didIteratorError18 = false;
            _iteratorError18 = undefined;
            _context21.prev = 5;
            _iterator18 = (0, _getIterator3.default)(xs);

          case 7:
            if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
              _context21.next = 17;
              break;
            }

            _x16 = _step18.value;

            if (!(--j < 0)) {
              _context21.next = 11;
              break;
            }

            return _context21.abrupt("return");

          case 11:
            if (!(--i < 0)) {
              _context21.next = 14;
              break;
            }

            _context21.next = 14;
            return _x16;

          case 14:
            _iteratorNormalCompletion18 = true;
            _context21.next = 7;
            break;

          case 17:
            _context21.next = 23;
            break;

          case 19:
            _context21.prev = 19;
            _context21.t0 = _context21["catch"](5);
            _didIteratorError18 = true;
            _iteratorError18 = _context21.t0;

          case 23:
            _context21.prev = 23;
            _context21.prev = 24;

            if (!_iteratorNormalCompletion18 && _iterator18.return) {
              _iterator18.return();
            }

          case 26:
            _context21.prev = 26;

            if (!_didIteratorError18) {
              _context21.next = 29;
              break;
            }

            throw _iteratorError18;

          case 29:
            return _context21.finish(26);

          case 30:
            return _context21.finish(23);

          case 31:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee20, this, [[5, 19, 23, 31], [24,, 26, 30]]);
  }));
});

/**
 * Applies the given function to each value in the given iterable until that function returns truthy, in which case true is returned. If the iterable is completely traversed and truthy is never returned by the given function then false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
 * @example
 * some(x => x === 20,
 *      [1, 2, 3, 4]) // => false
 * some(x => x === 2,
 *      [1, 2, 3, 4]) // => true
 */
var some = exports.some = curry(function (f, xs) {
  var _iteratorNormalCompletion19 = true;
  var _didIteratorError19 = false;
  var _iteratorError19 = undefined;

  try {
    for (var _iterator19 = (0, _getIterator3.default)(xs), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
      var _x17 = _step19.value;
      if (f(_x17)) return true;
    }
  } catch (err) {
    _didIteratorError19 = true;
    _iteratorError19 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion19 && _iterator19.return) {
        _iterator19.return();
      }
    } finally {
      if (_didIteratorError19) {
        throw _iteratorError19;
      }
    }
  }

  return false;
});

/**
 * Returns a new iterable of the given iterable sorted based on the return value of the given function when called with any two values from the given iterable
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * sort((a, b) => a - b,
 *      [5, 7, 3, 2]) // => iterableOf(2, 3, 5, 7)
 */
var sort = exports.sort = curry(function (f, xs) {
  return iterableFromIterable([].concat((0, _toConsumableArray3.default)(xs)).sort(f));
});

/**
 * Returns a new iterable comprised by iterables created from the given iterable of length specified by the given length
 * @param {Number} length
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * const splitEveryThree = splitEvery(3)
 * splitEveryThree([1, 2, 3, 4]) // => iterableOf(iterableOf(1, 2, 3), iterableOf(4))
 * splitEveryThree(range(1, Infinity)) // => iterableOf(iterableOf(1, 2, 3), iterableOf(4, 5, 6), iterableOf(7, 8, 9), ...)
 */
var splitEvery = exports.splitEvery = curry(function (a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee21() {
    var i, yieldVal;
    return _regenerator2.default.wrap(function _callee21$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            i = 0;

          case 1:
            if (!true) {
              _context22.next = 12;
              break;
            }

            yieldVal = slice(i * a)((i + 1) * a)(xs);

            if (!length(yieldVal)) {
              _context22.next = 8;
              break;
            }

            _context22.next = 6;
            return yieldVal;

          case 6:
            _context22.next = 9;
            break;

          case 8:
            return _context22.abrupt("return");

          case 9:
            i++;
            _context22.next = 1;
            break;

          case 12:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee21, this);
  }));
});

/**
 * Returns a new iterable of all but the first element of the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example tail(range(1, Infinity)) // => iterableOf(2, 3, 4, 5, 6, 7, 8, 9, ...)
 */
var tail = exports.tail = function tail(xs) {
  return createIterable(_regenerator2.default.mark(function _callee22() {
    var i, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, _x18;

    return _regenerator2.default.wrap(function _callee22$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            i = 1;
            _iteratorNormalCompletion20 = true;
            _didIteratorError20 = false;
            _iteratorError20 = undefined;
            _context23.prev = 4;
            _iterator20 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
              _context23.next = 17;
              break;
            }

            _x18 = _step20.value;

            if (!i) {
              _context23.next = 12;
              break;
            }

            i--;_context23.next = 14;
            break;

          case 12:
            _context23.next = 14;
            return _x18;

          case 14:
            _iteratorNormalCompletion20 = true;
            _context23.next = 6;
            break;

          case 17:
            _context23.next = 23;
            break;

          case 19:
            _context23.prev = 19;
            _context23.t0 = _context23["catch"](4);
            _didIteratorError20 = true;
            _iteratorError20 = _context23.t0;

          case 23:
            _context23.prev = 23;
            _context23.prev = 24;

            if (!_iteratorNormalCompletion20 && _iterator20.return) {
              _iterator20.return();
            }

          case 26:
            _context23.prev = 26;

            if (!_didIteratorError20) {
              _context23.next = 29;
              break;
            }

            throw _iteratorError20;

          case 29:
            return _context23.finish(26);

          case 30:
            return _context23.finish(23);

          case 31:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee22, this, [[4, 19, 23, 31], [24,, 26, 30]]);
  }));
};

/**
 * Returns an iterable of the first n elements of the given iterable
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * take(3,
 *      range(1, Infinity)) // => iterableOf(1, 2, 3)
 */
var take = exports.take = curry(function (a, xs) {
  return createIterable(_regenerator2.default.mark(function _callee23() {
    var i, _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, _x19;

    return _regenerator2.default.wrap(function _callee23$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            i = a;
            _iteratorNormalCompletion21 = true;
            _didIteratorError21 = false;
            _iteratorError21 = undefined;
            _context24.prev = 4;
            _iterator21 = (0, _getIterator3.default)(xs);

          case 6:
            if (_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done) {
              _context24.next = 17;
              break;
            }

            _x19 = _step21.value;

            if (i--) {
              _context24.next = 12;
              break;
            }

            return _context24.abrupt("return");

          case 12:
            _context24.next = 14;
            return _x19;

          case 14:
            _iteratorNormalCompletion21 = true;
            _context24.next = 6;
            break;

          case 17:
            _context24.next = 23;
            break;

          case 19:
            _context24.prev = 19;
            _context24.t0 = _context24["catch"](4);
            _didIteratorError21 = true;
            _iteratorError21 = _context24.t0;

          case 23:
            _context24.prev = 23;
            _context24.prev = 24;

            if (!_iteratorNormalCompletion21 && _iterator21.return) {
              _iterator21.return();
            }

          case 26:
            _context24.prev = 26;

            if (!_didIteratorError21) {
              _context24.next = 29;
              break;
            }

            throw _iteratorError21;

          case 29:
            return _context24.finish(26);

          case 30:
            return _context24.finish(23);

          case 31:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee23, this, [[4, 19, 23, 31], [24,, 26, 30]]);
  }));
});

/**
 * Returns an iterable of the all elements of the given iterable until the given function returns falsy when called on the value of that element
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * takeWhile(x => x < 5,
 *           range(1, Infinity)) // => iterableOf(1, 2, 3, 4)
 */
var takeWhile = exports.takeWhile = curry(function (f, xs) {
  return createIterable(_regenerator2.default.mark(function _callee24() {
    var _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, _x20;

    return _regenerator2.default.wrap(function _callee24$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _iteratorNormalCompletion22 = true;
            _didIteratorError22 = false;
            _iteratorError22 = undefined;
            _context25.prev = 3;
            _iterator22 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done) {
              _context25.next = 16;
              break;
            }

            _x20 = _step22.value;

            if (!f(_x20)) {
              _context25.next = 12;
              break;
            }

            _context25.next = 10;
            return _x20;

          case 10:
            _context25.next = 13;
            break;

          case 12:
            return _context25.abrupt("return");

          case 13:
            _iteratorNormalCompletion22 = true;
            _context25.next = 5;
            break;

          case 16:
            _context25.next = 22;
            break;

          case 18:
            _context25.prev = 18;
            _context25.t0 = _context25["catch"](3);
            _didIteratorError22 = true;
            _iteratorError22 = _context25.t0;

          case 22:
            _context25.prev = 22;
            _context25.prev = 23;

            if (!_iteratorNormalCompletion22 && _iterator22.return) {
              _iterator22.return();
            }

          case 25:
            _context25.prev = 25;

            if (!_didIteratorError22) {
              _context25.next = 28;
              break;
            }

            throw _iteratorError22;

          case 28:
            return _context25.finish(25);

          case 29:
            return _context25.finish(22);

          case 30:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee24, this, [[3, 18, 22, 30], [23,, 25, 29]]);
  }));
});

/**
 * Returns a new iterable which is a transposition of the given iterable (columns and rows swapped)
 * @param {Iterable} xs
 * @return {Iterable}
 * @example transpose([[1, 2, 3],
 *                     [4, 5, 6],
 *                     [7, 8, 9]]) // => iterableOf(iterableOf(1, 4, 7),
 *                                 //               iterableOf(2, 5, 8),
 *                                 //               iterableOf(3, 6, 9))
 */
var transpose = exports.transpose = function transpose(xss) {
  return createIterable(_regenerator2.default.mark(function _callee25() {
    var _this = this;

    var done, _nth, _loop, i, _ret;

    return _regenerator2.default.wrap(function _callee25$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            done = function done() {
              return null;
            };

            _nth = function _nth(a, xs) {
              var _iteratorNormalCompletion23 = true;
              var _didIteratorError23 = false;
              var _iteratorError23 = undefined;

              try {
                for (var _iterator23 = (0, _getIterator3.default)(xs), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                  var _x21 = _step23.value;
                  if (a-- <= 0) return _x21;
                }
              } catch (err) {
                _didIteratorError23 = true;
                _iteratorError23 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion23 && _iterator23.return) {
                    _iterator23.return();
                  }
                } finally {
                  if (_didIteratorError23) {
                    throw _iteratorError23;
                  }
                }
              }

              return done;
            };

            _loop = _regenerator2.default.mark(function _loop(i) {
              var returnGenerator;
              return _regenerator2.default.wrap(function _loop$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      returnGenerator = _regenerator2.default.mark(function returnGenerator() {
                        var j, _iteratorNormalCompletion24, _didIteratorError24, _iteratorError24, _iterator24, _step24, xs, value;

                        return _regenerator2.default.wrap(function returnGenerator$(_context26) {
                          while (1) {
                            switch (_context26.prev = _context26.next) {
                              case 0:
                                j = 0;
                                _iteratorNormalCompletion24 = true;
                                _didIteratorError24 = false;
                                _iteratorError24 = undefined;
                                _context26.prev = 4;
                                _iterator24 = (0, _getIterator3.default)(xss);

                              case 6:
                                if (_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done) {
                                  _context26.next = 15;
                                  break;
                                }

                                xs = _step24.value;
                                value = _nth(i, xs);

                                if (!(value !== done)) {
                                  _context26.next = 12;
                                  break;
                                }

                                _context26.next = 12;
                                return value;

                              case 12:
                                _iteratorNormalCompletion24 = true;
                                _context26.next = 6;
                                break;

                              case 15:
                                _context26.next = 21;
                                break;

                              case 17:
                                _context26.prev = 17;
                                _context26.t0 = _context26["catch"](4);
                                _didIteratorError24 = true;
                                _iteratorError24 = _context26.t0;

                              case 21:
                                _context26.prev = 21;
                                _context26.prev = 22;

                                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                                  _iterator24.return();
                                }

                              case 24:
                                _context26.prev = 24;

                                if (!_didIteratorError24) {
                                  _context26.next = 27;
                                  break;
                                }

                                throw _iteratorError24;

                              case 27:
                                return _context26.finish(24);

                              case 28:
                                return _context26.finish(21);

                              case 29:
                              case "end":
                                return _context26.stop();
                            }
                          }
                        }, returnGenerator, this, [[4, 17, 21, 29], [22,, 24, 28]]);
                      });

                      if (!returnGenerator().next().done) {
                        _context27.next = 3;
                        break;
                      }

                      return _context27.abrupt("return", {
                        v: undefined
                      });

                    case 3:
                      _context27.next = 5;
                      return createIterable(returnGenerator);

                    case 5:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, _loop, _this);
            });
            i = 0;

          case 4:
            return _context28.delegateYield(_loop(i), "t0", 5);

          case 5:
            _ret = _context28.t0;

            if (!((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object")) {
              _context28.next = 8;
              break;
            }

            return _context28.abrupt("return", _ret.v);

          case 8:
            i++;
            _context28.next = 4;
            break;

          case 11:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee25, this);
  }));
};

/**
 * Returns a new iterable with values as iterables of length 2 with the first element as the corresponding element from the first given iterable and the second element as the corresponding element from the second given iterable. The length of the returned iterable is the same as the shortest iterable supplied
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * zip([2, 3, 5, 7],
 *     range(1, Infinity)) // => iterableOf(iterableOf(2, 1),
 *                         //               iterableOf(3, 2),
 *                         //               iterableOf(5, 3),
 *                         //               iterableOf(7, 4))
 */
var zip = exports.zip = curry(function (xs, ys) {
  var iteratorB = (0, _getIterator3.default)(ys);
  return createIterable(_regenerator2.default.mark(function _callee26() {
    var _iteratorNormalCompletion25, _didIteratorError25, _iteratorError25, _iterator25, _step25, _x22, _iteratorB$next, done, _value;

    return _regenerator2.default.wrap(function _callee26$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _iteratorNormalCompletion25 = true;
            _didIteratorError25 = false;
            _iteratorError25 = undefined;
            _context29.prev = 3;
            _iterator25 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done) {
              _context29.next = 19;
              break;
            }

            _x22 = _step25.value;
            _iteratorB$next = iteratorB.next();
            done = _iteratorB$next.done;
            _value = _iteratorB$next.value;

            if (!done) {
              _context29.next = 14;
              break;
            }

            return _context29.abrupt("return");

          case 14:
            _context29.next = 16;
            return iterableFromIterable([_x22, _value]);

          case 16:
            _iteratorNormalCompletion25 = true;
            _context29.next = 5;
            break;

          case 19:
            _context29.next = 25;
            break;

          case 21:
            _context29.prev = 21;
            _context29.t0 = _context29["catch"](3);
            _didIteratorError25 = true;
            _iteratorError25 = _context29.t0;

          case 25:
            _context29.prev = 25;
            _context29.prev = 26;

            if (!_iteratorNormalCompletion25 && _iterator25.return) {
              _iterator25.return();
            }

          case 28:
            _context29.prev = 28;

            if (!_didIteratorError25) {
              _context29.next = 31;
              break;
            }

            throw _iteratorError25;

          case 31:
            return _context29.finish(28);

          case 32:
            return _context29.finish(25);

          case 33:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee26, this, [[3, 21, 25, 33], [26,, 28, 32]]);
  }));
});

/**
 * Returns a new iterable with values as the result of calling the given function with the corresponding element from the first and second given iterables respectively. The length of the returned iterable is the same as the shortest iterable supplied
 * @param {Function} f
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * zipWith((a, b) => a + b
 *         [2, 3, 5, 7],
 *         range(1, Infinity)) // => iterableOf(3, 5, 8, 11)
 */
var zipWith = exports.zipWith = curry(function (f, xs, ys) {
  var iteratorB = (0, _getIterator3.default)(ys);
  return createIterable(_regenerator2.default.mark(function _callee27() {
    var _iteratorNormalCompletion26, _didIteratorError26, _iteratorError26, _iterator26, _step26, _x23, _iteratorB$next2, _done, _value2;

    return _regenerator2.default.wrap(function _callee27$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _iteratorNormalCompletion26 = true;
            _didIteratorError26 = false;
            _iteratorError26 = undefined;
            _context30.prev = 3;
            _iterator26 = (0, _getIterator3.default)(xs);

          case 5:
            if (_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done) {
              _context30.next = 19;
              break;
            }

            _x23 = _step26.value;
            _iteratorB$next2 = iteratorB.next();
            _done = _iteratorB$next2.done;
            _value2 = _iteratorB$next2.value;

            if (!_done) {
              _context30.next = 14;
              break;
            }

            return _context30.abrupt("return");

          case 14:
            _context30.next = 16;
            return f(_x23, _value2);

          case 16:
            _iteratorNormalCompletion26 = true;
            _context30.next = 5;
            break;

          case 19:
            _context30.next = 25;
            break;

          case 21:
            _context30.prev = 21;
            _context30.t0 = _context30["catch"](3);
            _didIteratorError26 = true;
            _iteratorError26 = _context30.t0;

          case 25:
            _context30.prev = 25;
            _context30.prev = 26;

            if (!_iteratorNormalCompletion26 && _iterator26.return) {
              _iterator26.return();
            }

          case 28:
            _context30.prev = 28;

            if (!_didIteratorError26) {
              _context30.next = 31;
              break;
            }

            throw _iteratorError26;

          case 31:
            return _context30.finish(28);

          case 32:
            return _context30.finish(25);

          case 33:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee27, this, [[3, 21, 25, 33], [26,, 28, 32]]);
  }));
});
