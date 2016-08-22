import test from 'ava'
import {assoc} from '../'
import {
  testAndToArray,
  positiveIntegers,
  takeEight
} from './_tools'

test('assoc', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(assoc(4)(100)(positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(takeEight(assoc(4, 100)(positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
  t.deepEqual(
    processIterable(takeEight(assoc(4)(100, positiveIntegers))),
    [1, 2, 3, 4, 100, 6, 7, 8]
  )
})
