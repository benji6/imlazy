const test = require('tape')
const { iterate } = require('../')
const { double, testAndToArray, takeEight } = require('./_tools')

test('iterate', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(takeEight(iterate(double)(1))), [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
  ])
  t.deepEqual(processIterable(takeEight(iterate(double, 1))), [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
  ])
  t.end()
})
