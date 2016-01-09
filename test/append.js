import test from 'ava'
import {append} from '../'
import {
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour
} from './_tools'

test('append', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(append(4)([])), [4])
  t.same(processIterable(append(4, oneTwoThree)), oneTwoThreeFour)
})
