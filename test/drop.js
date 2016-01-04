import test from 'ava'
import {drop} from '../'
import {
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree
} from './_tools'

test('drop', t => {
  const processIterable = isFrozenToArray(t)
  const dropOne = drop(1)
  t.same(processIterable(dropOne(oneTwoThreeFour)), [2, 3, 4])
  t.same(processIterable(dropOne(oneTwoThreeFour)), [2, 3, 4])
  const twoThreeFour = dropOne(oneTwoThreeFour)
  t.same(processIterable(twoThreeFour), [2, 3, 4])
  t.same(processIterable(twoThreeFour), [2, 3, 4])
  t.same(processIterable(twoThreeFour), [2, 3, 4])
  t.same(processIterable(takeThree(dropOne(positiveIntegers))), [2, 3, 4])
  t.same(processIterable(takeThree(dropOne(positiveIntegers))), [2, 3, 4])
  t.same(processIterable(drop(3)(oneTwoThreeFour)), [4])
  t.same(processIterable(drop(30, oneTwoThree)), [])
})
