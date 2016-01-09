import test from 'ava'
import {sort} from '../'
import {
  fourThreeTwoOne,
  isFrozenToArray,
  oneTwoThreeFour
} from './_tools'

test('sort', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(sort((a, b) => a > b)(oneTwoThreeFour)),
    oneTwoThreeFour
  )
  t.same(
    processIterable(sort((a, b) => a < b, oneTwoThreeFour)),
    fourThreeTwoOne
  )
})
