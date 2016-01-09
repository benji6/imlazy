import test from 'ava'
import {partition} from '../'
import {
  isEven,
  isFrozenToArray,
  oneTwoThreeFour
} from './_tools'

test('partition', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(partition(isEven)(oneTwoThreeFour)).map(processIterable),
    [[2, 4], [1, 3]]
  )
  t.same(
    processIterable(partition(isEven, oneTwoThreeFour)).map(processIterable),
    [[2, 4], [1, 3]]
  )
})
