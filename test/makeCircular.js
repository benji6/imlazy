import test from 'ava'
import {makeCircular, range} from '../'
import {isFrozenToArray, takeEight} from './_tools'

test('makeCircular', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(makeCircular(range(1)(3)))),
    [1, 2, 3, 1, 2, 3, 1, 2]
  )
})
