const test = require('tape')
const { insertAll } = require('../')
const {
  testAndToArray,
  negativeIntegers,
  positiveIntegers,
  takeEight,
} = require('./_tools')

test('insertAll', (t) => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(insertAll(2)([20, 21, 22])(positiveIntegers))),
    [1, 2, 20, 21, 22, 3, 4, 5],
  )
  t.deepEqual(
    processIterable(
      takeEight(insertAll(2, negativeIntegers)(positiveIntegers)),
    ),
    [1, 2, -1, -2, -3, -4, -5, -6],
  )
  t.end()
})
