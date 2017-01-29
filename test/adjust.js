const test = require('tape')
const {adjust} = require('../')
const {
  double,
  fibonacciNumbers,
  testAndToArray,
  positiveIntegers,
  takeEight,
} = require('./_tools')

test('adjust', t => {
  const processIterable = testAndToArray(t)

  t.deepEqual(
    processIterable(takeEight(adjust(double)(2)(positiveIntegers))),
    [1, 2, 6, 4, 5, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(takeEight(adjust(double)(2)(positiveIntegers))),
    [1, 2, 6, 4, 5, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(takeEight(adjust(double, 2, fibonacciNumbers))),
    [1, 1, 4, 3, 5, 8, 13, 21]
  )
  t.end()
})
