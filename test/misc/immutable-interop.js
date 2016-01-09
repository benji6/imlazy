import Immutable from 'immutable'
import {append} from '../../'
import {isFrozenToArray, oneTwoThreeFour} from '../_tools'
import test from 'ava'

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(
    processIterable(append(4, immutableOneTwoThree)),
    oneTwoThreeFour
  )
})
