import test from 'ava'
import {reverse} from '../'
import {
  testAndToArray,
  oneTwoThree,
  threeTwoOne
} from './_tools'

test('reverse', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(reverse(oneTwoThree)), threeTwoOne)
})
