import test from 'ava'
import {intersperse} from '../'
import {
  testAndToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('intersperse', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(takeEight(intersperse(2)(positiveIntegers))),
    [1, 2, 2, 2, 3, 2, 4, 2]
  )
  t.same(
    processIterable(takeEight(intersperse(2, positiveIntegers))),
    [1, 2, 2, 2, 3, 2, 4, 2]
  )
})
