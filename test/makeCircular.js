import test from 'ava'
import {cycle, range} from '../'
import {isFrozenToArray, takeEight} from './_tools'

test('cycle', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(cycle(range(1)(3)))),
    [1, 2, 3, 1, 2, 3, 1, 2]
  )
})
