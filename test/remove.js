import test from 'ava'
import {remove} from '../'
import {
  testAndToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('remove', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(takeEight(remove(2)(4)(positiveIntegers))),
    [1, 2, 7, 8, 9, 10, 11, 12]
  )
  t.same(
    processIterable(takeEight(remove(2, 4, positiveIntegers))),
    [1, 2, 7, 8, 9, 10, 11, 12]
  )
})
