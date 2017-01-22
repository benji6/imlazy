import test from 'ava'
import {flatten} from '../'
import {
  infiniteIterableOfPositiveIntegers,
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  threeTwoOne,
} from './_tools'

test('flatten', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(flatten([oneTwoThree, threeTwoOne, oneTwoThreeFour])),
    [...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.deepEqual(
    processIterable(flatten([1, oneTwoThree, threeTwoOne, oneTwoThreeFour])),
    [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.deepEqual(
    processIterable(flatten([1, [[[[oneTwoThree]]]], threeTwoOne, oneTwoThreeFour])),
    [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.deepEqual(
    processIterable(takeEight(flatten([oneTwoThree, positiveIntegers]))),
    [...oneTwoThree, ...oneTwoThreeFour, 5]
  )
  t.deepEqual(
    processIterable(takeEight(flatten(infiniteIterableOfPositiveIntegers))),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
})
