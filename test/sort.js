import test from 'ava'
import {sort} from '../'
import {
  fourThreeTwoOne,
  testAndToArray,
  oneTwoThreeFour
} from './_tools'

test('sort', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(sort((a, b) => a > b)(oneTwoThreeFour)),
    oneTwoThreeFour
  )
  t.same(
    processIterable(sort((a, b) => a < b, oneTwoThreeFour)),
    fourThreeTwoOne
  )
})
