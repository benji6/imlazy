import test from 'ava'
import {iterableOf} from '../'
import {isFrozenToArray, oneTwoThree} from './_tools'

test('iterableOf', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(iterableOf(1, 2, 3)), oneTwoThree)
})
