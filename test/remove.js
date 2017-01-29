const test = require('tape')
const {remove} = require('../')
const {
  testAndToArray,
  positiveIntegers,
  takeEight,
} = require('./_tools')

test('remove', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(remove(2)(4)(positiveIntegers))),
    [1, 2, 7, 8, 9, 10, 11, 12]
  )
  t.deepEqual(
    processIterable(takeEight(remove(2, 4, positiveIntegers))),
    [1, 2, 7, 8, 9, 10, 11, 12]
  )
  t.end()
})
