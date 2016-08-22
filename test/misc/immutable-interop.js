import Immutable from 'immutable'
import {append} from '../../'
import {testAndToArray, oneTwoThreeFour} from '../_tools'
import test from 'ava'

test('immutable interop', t => {
  const processIterable = testAndToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.deepEqual(
    processIterable(append(4, immutableOneTwoThree)),
    oneTwoThreeFour
  )
})
