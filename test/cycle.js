const test = require('tape')
const { cycle, range } = require('../')
const { testAndToArray, takeEight } = require('./_tools')

test('cycle', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(takeEight(cycle(range(1)(3)))), [
    1,
    2,
    3,
    1,
    2,
    3,
    1,
    2,
  ])
  t.deepEqual(processIterable(takeEight(cycle([]))), [])
  t.end()
})
