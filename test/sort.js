const test = require('tape')
const { sort } = require('../')
const { fourThreeTwoOne, testAndToArray, oneTwoThreeFour } = require('./_tools')

test('sort', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(sort((a, b) => a - b)(oneTwoThreeFour)),
    oneTwoThreeFour,
  )
  t.deepEqual(
    processIterable(sort((a, b) => b - a, oneTwoThreeFour)),
    fourThreeTwoOne,
  )
  t.end()
})
