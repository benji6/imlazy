import test from 'ava'
import {append} from '../'
import {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour
} from './_tools'

test('append', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(append(4)([])), [4])
  t.deepEqual(processIterable(append(4, oneTwoThree)), oneTwoThreeFour)
})
