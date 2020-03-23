const test = require('tape')
const { drop } = require('../')
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
} = require('./_tools')

test('drop', (t) => {
  const processIterable = testAndToArray(t)
  const dropOne = drop(1)
  t.deepEqual(processIterable(dropOne(oneTwoThreeFour)), [2, 3, 4])
  t.deepEqual(processIterable(dropOne(oneTwoThreeFour)), [2, 3, 4])
  const twoThreeFour = dropOne(oneTwoThreeFour)
  t.deepEqual(processIterable(twoThreeFour), [2, 3, 4])
  t.deepEqual(processIterable(twoThreeFour), [2, 3, 4])
  t.deepEqual(processIterable(twoThreeFour), [2, 3, 4])
  t.deepEqual(processIterable(takeThree(dropOne(positiveIntegers))), [2, 3, 4])
  t.deepEqual(processIterable(takeThree(dropOne(positiveIntegers))), [2, 3, 4])
  t.deepEqual(processIterable(drop(3)(oneTwoThreeFour)), [4])
  t.deepEqual(processIterable(drop(30, oneTwoThree)), [])
  t.deepEqual(processIterable(drop(30, oneTwoThree)), [])
  t.end()
})
