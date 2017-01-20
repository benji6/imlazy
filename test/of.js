import test from 'ava'
import {of} from '../'
import {testAndToArray, oneTwoThree} from './_tools'

test('of', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(of(1, 2, 3)), oneTwoThree)
})
