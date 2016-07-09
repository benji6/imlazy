import test from 'ava'
import {transpose} from '../'
import {
  infiniteIterableOfPositiveIntegers,
  testAndToArray,
  negativeIntegers,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  takeThree
} from './_tools'

test('transpose', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(transpose([oneTwoThreeFour, oneTwoThree, oneTwoThree]))
      .map(processIterable),
    [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4]]
  )
  t.same(
    processIterable(takeEight(transpose([oneTwoThree, negativeIntegers, positiveIntegers, [64]])))
      .map(takeEight).map(processIterable),
    [[1, -1, 1, 64], [2, -2, 2], [3, -3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [-8, 8]]
  )
  t.same(
    processIterable(takeThree(infiniteIterableOfPositiveIntegers))
      .map(takeThree)
      .map(processIterable),
    [oneTwoThree, oneTwoThree, oneTwoThree]
  )
})
