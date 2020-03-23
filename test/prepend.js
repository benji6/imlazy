const test = require('tape')
const { prepend } = require('../')
const { testAndToArray, positiveIntegers, takeEight } = require('./_tools')

test('prepend', (t) => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(prepend(1)([])), [1])
  t.deepEqual(processIterable(takeEight(prepend(0, positiveIntegers))), [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ])
  t.end()
})
