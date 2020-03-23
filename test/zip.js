const test = require('tape')
const { zip } = require('../')
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
  threeTwoOne,
} = require('./_tools')

test('zip', (t) => {
  const processIterable = testAndToArray(t)
  const xss = takeThree(zip(positiveIntegers, positiveIntegers))
  t.deepEqual(
    processIterable(zip(oneTwoThree)(threeTwoOne)).map(processIterable),
    [
      [1, 3],
      [2, 2],
      [3, 1],
    ],
  )
  t.deepEqual(
    processIterable(zip(oneTwoThreeFour)(threeTwoOne)).map(processIterable),
    [
      [1, 3],
      [2, 2],
      [3, 1],
    ],
  )
  t.deepEqual(
    processIterable(zip(threeTwoOne)(positiveIntegers)).map(processIterable),
    [
      [3, 1],
      [2, 2],
      [1, 3],
    ],
  )
  t.deepEqual(processIterable(xss).map(processIterable), [
    [1, 1],
    [2, 2],
    [3, 3],
  ])
  t.deepEqual(processIterable(xss).map(processIterable), [
    [1, 1],
    [2, 2],
    [3, 3],
  ])
  t.deepEqual(processIterable(xss).map(processIterable), [
    [1, 1],
    [2, 2],
    [3, 3],
  ])
  t.end()
})
