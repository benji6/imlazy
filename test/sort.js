import test from 'ava'
import {sort} from '../'
import {
  fourThreeTwoOne,
  testAndToArray,
  oneTwoThreeFour,
} from './_tools'

test('sort', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(sort((a, b) => a > b)(oneTwoThreeFour)),
    oneTwoThreeFour
  )
  t.deepEqual(
    processIterable(sort((a, b) => a < b, oneTwoThreeFour)),
    fourThreeTwoOne
  )
})
