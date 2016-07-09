import test from 'ava'
import {reverse} from '../'
import {
  testAndToArray,
  oneTwoThree,
  threeTwoOne
} from './_tools'

test('reverse', t => {
  const processIterable = testAndToArray(t)
  t.same(processIterable(reverse(oneTwoThree)), threeTwoOne)
})
