import test from 'ava'
import {map, range, take} from '../'
import {isFrozenToArray, oneTwoThree, threeTwoOne} from './_tools'

test('range', t => {
  const rangeFromThree = range(3)
  const processIterable = isFrozenToArray(t)
  const positiveIntegers = map(x => x, range(1, Infinity))
  t.same(processIterable(range(1)(1)), [1])
  t.same(processIterable(range(1, 3)), oneTwoThree)
  t.same(processIterable(range(1, 3)), oneTwoThree)
  t.same(processIterable(take(8, positiveIntegers)), [1, 2, 3, 4, 5, 6, 7, 8])
  t.same(processIterable(take(8, positiveIntegers)), [1, 2, 3, 4, 5, 6, 7, 8])
  t.same(processIterable(take(8, positiveIntegers)), [1, 2, 3, 4, 5, 6, 7, 8])
  t.same(processIterable(rangeFromThree(1)), threeTwoOne)
  t.same(processIterable(rangeFromThree(1)), threeTwoOne)
})
