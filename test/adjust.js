import test from 'ava'
import {adjust} from '../'
import {
  double,
  fibonacciNumbers,
  isFrozenToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('adjust', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeEight(adjust(double)(2)(positiveIntegers))),
    [1, 2, 6, 4, 5, 6, 7, 8]
  )
  t.same(
    processIterable(takeEight(adjust(double)(2)(positiveIntegers))),
    [1, 2, 6, 4, 5, 6, 7, 8]
  )
  t.same(
    processIterable(takeEight(adjust(double, 2, fibonacciNumbers))),
    [1, 1, 4, 3, 5, 8, 13, 21]
  )
})
