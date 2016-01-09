import test from 'ava'
import {flatten} from '../'
import {
  infiniteIterableOfPositiveIntegers,
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  threeTwoOne
} from './_tools'

test('flatten', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(flatten([oneTwoThree, threeTwoOne, oneTwoThreeFour])),
    [...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.same(
    processIterable(flatten([1, oneTwoThree, threeTwoOne, oneTwoThreeFour])),
    [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.same(
    processIterable(flatten([1, [[[[oneTwoThree]]]], threeTwoOne, oneTwoThreeFour])),
    [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]
  )
  t.same(
    processIterable(takeEight(flatten([oneTwoThree, positiveIntegers]))),
    [...oneTwoThree, ...oneTwoThreeFour, 5]
  )
  t.same(
    processIterable(takeEight(flatten(infiniteIterableOfPositiveIntegers))),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
})
