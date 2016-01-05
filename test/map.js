import test from 'ava'
import {map} from '../'
import {halve, isFrozenToArray, oneTwoThree} from './_tools'

test('map', t => {
  const processIterable = isFrozenToArray(t)
  const anotherOneTwoThree = map(halve)([2, 4, 6])
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
  t.same(processIterable(map(halve, [2, 4, 6])), oneTwoThree)
  t.same(processIterable(map(halve, new Set([2, 4, 6]))), oneTwoThree)
})
