import test from 'ava'
import {init} from '../'
import {
  isFrozenToArray,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight
} from './_tools'

test('init', t => {
  const processIterable = isFrozenToArray(t)
  const initPositiveIntegers = init(positiveIntegers)

  t.same(
    processIterable(init([])),
    []
  )
  t.same(
    processIterable(takeEight(initPositiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
  t.same(
    processIterable(takeEight(initPositiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  )
  t.same(
    processIterable(init(oneTwoThreeFour)),
    [1, 2, 3]
  )
})
