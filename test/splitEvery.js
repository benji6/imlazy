const test = require('tape')
const {splitEvery} = require('../')
const {
  testAndToArray,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
} = require('./_tools')

test('splitEvery', t => {
  const processIterable = testAndToArray(t)
  const splitEveryThree = splitEvery(3)
  t.deepEqual(
    processIterable(splitEveryThree(oneTwoThreeFour)).map(processIterable),
    [[1, 2, 3], [4]]
  )
  t.deepEqual(
    processIterable(takeThree(splitEveryThree(positiveIntegers))).map(processIterable),
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  )
  t.end()
})
