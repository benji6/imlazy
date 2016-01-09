import test from 'ava'
import {reverse} from '../'
import {
  isFrozenToArray,
  oneTwoThree,
  threeTwoOne
} from './_tools'

test('reverse', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(reverse(oneTwoThree)), threeTwoOne)
})
