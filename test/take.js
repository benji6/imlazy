import test from 'ava'
import {map} from '../'
import {
  double,
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree
} from './_tools'

test('take', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeThree([1])), [1])
  t.same(processIterable(takeThree(oneTwoThreeFour)), oneTwoThree)
  t.same(processIterable(takeThree(positiveIntegers)), oneTwoThree)
  t.same(processIterable(takeThree(map(double)(positiveIntegers))), [2, 4, 6])
  t.same(processIterable(map(double)(takeThree(positiveIntegers))), [2, 4, 6])
})
