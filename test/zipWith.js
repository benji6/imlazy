import test from 'ava'
import {zipWith} from '../'
import {
  add,
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  subtract,
  takeThree,
  threeTwoOne
} from './_tools'

test('zipWith', t => {
  const processIterable = testAndToArray(t)
  const zipWithSubtract = zipWith(subtract)
  const twoFourSix = takeThree(zipWith(add, positiveIntegers, positiveIntegers))
  t.deepEqual(
    processIterable(zipWithSubtract(oneTwoThree)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.deepEqual(
    processIterable(zipWithSubtract(oneTwoThreeFour)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.deepEqual(
    processIterable(zipWithSubtract(threeTwoOne)(positiveIntegers)),
    [2, 0, -2]
  )
  t.deepEqual(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
  t.deepEqual(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
  t.deepEqual(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
})
