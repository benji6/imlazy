const test = require('tape')
const {transpose} = require('../')
const {
  infiniteIterableOfPositiveIntegers,
  testAndToArray,
  negativeIntegers,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  takeThree,
} = require('./_tools')

test('transpose', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(transpose([oneTwoThreeFour, oneTwoThree, oneTwoThree]))
      .map(processIterable),
    [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4]],
  )
  t.deepEqual(
    processIterable(takeEight(transpose([oneTwoThree, negativeIntegers, positiveIntegers, [64]])))
      .map(takeEight).map(processIterable),
    [[1, -1, 1, 64], [2, -2, 2], [3, -3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [-8, 8]],
  )
  t.deepEqual(
    processIterable(takeThree(infiniteIterableOfPositiveIntegers))
      .map(takeThree)
      .map(processIterable),
    [oneTwoThree, oneTwoThree, oneTwoThree],
  )
  t.end()
})
