import test from 'ava'
import {iterableFrom} from '../'
import {isFrozenToArray, oneTwoThree} from './_tools'

test('iterableFrom', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(iterableFrom(oneTwoThree)), oneTwoThree)
})
