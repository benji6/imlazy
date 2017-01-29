const test = require('tape')
const {init} = require('../')
const {
  testAndToArray,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
} = require('./_tools')

test('init', t => {
  const processIterable = testAndToArray(t)
  const initPositiveIntegers = init(positiveIntegers)

  t.deepEqual(
    processIterable(init([])),
    []
  )
  t.deepEqual(
    processIterable(takeEight(initPositiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(takeEight(initPositiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(init(oneTwoThreeFour)),
    [1, 2, 3]
  )
  t.end()
})
