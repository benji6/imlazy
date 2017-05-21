const test = require('tape')
const {map, take} = require('../')
const {
  double,
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
  throwOnThird,
} = require('./_tools')

test('take', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(takeThree([1])), [1])
  t.deepEqual(processIterable(takeThree(oneTwoThreeFour)), oneTwoThree)
  t.deepEqual(processIterable(takeThree(positiveIntegers)), oneTwoThree)
  t.deepEqual(processIterable(takeThree(map(double)(positiveIntegers))), [2, 4, 6])
  t.deepEqual(processIterable(map(double)(takeThree(positiveIntegers))), [2, 4, 6])
  t.deepEqual(processIterable(take(2, throwOnThird)), [1, 2])
  t.end()
})
