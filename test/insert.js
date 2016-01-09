import test from 'ava'
import {insert} from '../'
import {
  isFrozenToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('insert', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(insert(2)(20)(positiveIntegers))),
    [1, 2, 20, 3, 4, 5, 6, 7]
  )
  t.same(
    processIterable(takeEight(insert(2, 20)(positiveIntegers))),
    [1, 2, 20, 3, 4, 5, 6, 7]
  )
})
