import test from 'ava'
import {tail} from '../'
import {testAndToArray, positiveIntegers, takeEight} from './_tools'

test('tail', t => {
  const processIterable = testAndToArray(t)
  t.same(processIterable(tail([])), [])
  const tailPositiveIntegers = tail(positiveIntegers)
  t.same(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9]
  )
  t.same(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9]
  )
  t.same(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9]
  )
})
