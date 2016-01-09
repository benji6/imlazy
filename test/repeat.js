import test from 'ava'
import {repeat} from '../'
import {
  fiveFiveFive,
  isFrozenToArray,
  takeThree
} from './_tools'

test('repeat', t => {
  const processIterable = isFrozenToArray(t)
  const repeatFive = repeat(5)
  t.same(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.same(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.same(processIterable(takeThree(repeat(5))), fiveFiveFive)
})
