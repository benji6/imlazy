import test from 'ava'
import {assoc} from '../'
import {
  isFrozenToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('assoc', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(assoc(4)(100)(positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
  t.same(
    processIterable(takeEight(assoc(4, 100)(positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
  t.same(
    processIterable(takeEight(assoc(4)(100, positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
})
