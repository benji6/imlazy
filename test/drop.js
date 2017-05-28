const test = require('tape')
const {drop, map, range} = require('../')
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
} = require('./_tools')

test('drop', t => {
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

  let invocationCount = 0
  const incrementInvocationCount = map(() => invocationCount++)
  ;[...drop(8, incrementInvocationCount(range(0, 15)))]
  t.equal(invocationCount, 8)
  invocationCount = 0
  ;[...drop(8, incrementInvocationCount(incrementInvocationCount(range(0, 15))))]
  t.equal(invocationCount, 16)
  t.deepEqual(processIterable(drop(30, oneTwoThree)), [])
  t.end()
})
