const test = require('tape')
const {intersperse} = require('../')
const {
  testAndToArray,
  positiveIntegers,
  takeEight,
} = require('./_tools')

test('intersperse', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(intersperse(2)(positiveIntegers))),
    [1, 2, 2, 2, 3, 2, 4, 2]
  )
  t.deepEqual(
    processIterable(takeEight(intersperse(2, positiveIntegers))),
    [1, 2, 2, 2, 3, 2, 4, 2]
  )
  t.end()
})
