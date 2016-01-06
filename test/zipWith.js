import test from 'ava'
import {zipWith} from '../'
import {
  add,
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  subtract,
  takeThree,
  threeTwoOne
} from './_tools'

test('zipWith', t => {
  const processIterable = isFrozenToArray(t)
  const zipWithSubtract = zipWith(subtract)
  t.same(
    processIterable(zipWithSubtract(oneTwoThree)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.same(
    processIterable(zipWithSubtract(oneTwoThreeFour)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.same(
    processIterable(zipWithSubtract(threeTwoOne)(positiveIntegers)),
    [2, 0, -2]
  )
  t.same(
    processIterable(takeThree(zipWith(add, positiveIntegers, positiveIntegers))),
    [2, 4, 6]
  )
})
