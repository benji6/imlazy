import test from 'ava'
import {slice} from '../'
import {
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers
} from './_tools'

test('slice', t => {
  const sliceFromZero = slice(0)
  const processIterable = isFrozenToArray(t)
  const twoThree = slice(1)(20)(oneTwoThree)
  t.same(processIterable(sliceFromZero(3)(oneTwoThreeFour)), oneTwoThree)
  t.same(processIterable(slice(1)(2)(oneTwoThree)), [2])
  t.same(processIterable(twoThree), [2, 3])
  t.same(processIterable(twoThree), [2, 3])
  t.same(processIterable(twoThree), [2, 3])
  t.same(processIterable(slice(1)(1)(oneTwoThree)), [])
  t.same(processIterable(slice(20)(100)(oneTwoThree)), [])
  t.same(processIterable(slice(0)(3)(positiveIntegers)), [1, 2, 3])
  t.same(processIterable(slice(3)(6)(positiveIntegers)), [4, 5, 6])
  t.same(processIterable(slice(40)(45)(positiveIntegers)), [41, 42, 43, 44, 45])
  t.same(
    processIterable(sliceFromZero(3)(slice(0, Infinity, positiveIntegers))),
    oneTwoThree
  )
})
