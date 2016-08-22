import test from 'ava'
import {insert} from '../'
import {
  testAndToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('insert', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(insert(2)(20)(positiveIntegers))),
    [1, 2, 20, 3, 4, 5, 6, 7]
  )
  t.deepEqual(
    processIterable(takeEight(insert(2, 20)(positiveIntegers))),
    [1, 2, 20, 3, 4, 5, 6, 7]
  )
})
