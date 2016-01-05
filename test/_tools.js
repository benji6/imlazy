'use strict'
const range = require('../').range
const take = require('../').take
const B = a => b => c => a(b(c))

module.exports.add = (a, b) => a + b
module.exports.oneTwoThree = Object.freeze([1, 2, 3])
module.exports.oneTwoThreeFour = Object.freeze([1, 2, 3, 4])
module.exports.fibonacciGenerator = function * () {
  var a = 1
  var b = 1
  while (true) {
    yield a
    const c = a + b
    a = b
    b = c
  }
}
module.exports.isFrozen = t => iterable => (t.throws(() => iterable.a = 1), iterable)
module.exports.toArray = iterable => [...iterable]
module.exports.isFrozenToArray = t => B(module.exports.toArray)(module.exports.isFrozen(t))
module.exports.double = x => x * 2
module.exports.takeThree = take(3)
module.exports.takeEight = take(8)
module.exports.positiveIntegers = range(1)(Infinity)
module.exports.halve = x => x / 2
module.exports.threeTwoOne = Object.freeze([3, 2, 1])
module.exports.negativeIntegers = range(-1)(-Infinity)
