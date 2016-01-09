import test from 'ava'
import {insertAll} from '../'
import {
  isFrozenToArray,
  negativeIntegers,
  positiveIntegers,
  takeEight
} from './_tools'

test('insertAll', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(insertAll(2)([20, 21, 22])(positiveIntegers))),
    [1, 2, 20, 21, 22, 3, 4, 5]
  )
  t.same(
    processIterable(takeEight(insertAll(2, negativeIntegers)(positiveIntegers))),
    [1, 2, -1, -2, -3, -4, -5, -6]
  )
})
