import test from 'ava'
import {iterableFrom} from '../'
import {testAndToArray, oneTwoThree} from './_tools'

test('iterableFrom', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(iterableFrom(oneTwoThree)), oneTwoThree)
})
