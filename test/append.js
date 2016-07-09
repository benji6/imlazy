import test from 'ava'
import {append} from '../'
import {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour
} from './_tools'

test('append', t => {
  const processIterable = testAndToArray(t)
  t.same(processIterable(append(4)([])), [4])
  t.same(processIterable(append(4, oneTwoThree)), oneTwoThreeFour)
})
