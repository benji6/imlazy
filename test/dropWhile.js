import test from 'ava'
import {dropWhile} from '../'
import {isFrozenToArray, oneTwoThreeFour} from './_tools'

test('dropWhile', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(dropWhile(a => a !== 3)(oneTwoThreeFour)), [3, 4])
  t.same(processIterable(dropWhile(a => a !== 12321, oneTwoThreeFour)), [])
})
