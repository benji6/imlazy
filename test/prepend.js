import test from 'ava'
import {prepend} from '../'
import {
  testAndToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('prepend', t => {
  const processIterable = testAndToArray(t)
  t.same(processIterable(prepend(1)([])), [1])
  t.same(
    processIterable(takeEight(prepend(0, positiveIntegers))),
    [0, 1, 2, 3, 4, 5, 6, 7]
  )
})
