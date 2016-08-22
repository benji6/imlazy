import test from 'ava'
import {partition} from '../'
import {
  isEven,
  testAndToArray,
  oneTwoThreeFour
} from './_tools'

test('partition', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(partition(isEven)(oneTwoThreeFour)).map(processIterable),
    [[2, 4], [1, 3]]
  )
  t.deepEqual(
    processIterable(partition(isEven, oneTwoThreeFour)).map(processIterable),
    [[2, 4], [1, 3]]
  )
})
