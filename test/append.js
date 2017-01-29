const test = require('tape')
const {append} = require('../')
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
} = require('./_tools')

test('append', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(append(4)([])), [4])
  t.deepEqual(processIterable(append(4, oneTwoThree)), oneTwoThreeFour)
  t.end()
})
