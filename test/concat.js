import test from 'ava'
import {concat} from '../'
import {
  testAndToArray,
  negativeIntegers,
  oneTwoThree,
  takeEight,
  threeTwoOne
} from './_tools'

test('concat', t => {
  const concatOneTwoThree = concat(oneTwoThree)
  const processIterable = testAndToArray(t)
  const oneTwoThreeThreeTwoOne = concatOneTwoThree(threeTwoOne)
  t.same(processIterable(oneTwoThreeThreeTwoOne), [1, 2, 3, 3, 2, 1])
  t.same(processIterable(oneTwoThreeThreeTwoOne), [1, 2, 3, 3, 2, 1])
  t.same(processIterable(oneTwoThreeThreeTwoOne), [1, 2, 3, 3, 2, 1])
  t.same(
    processIterable(takeEight(concatOneTwoThree(negativeIntegers))),
    [1, 2, 3, -1, -2, -3, -4, -5]
  )
  t.same(
    processIterable(takeEight(concat(negativeIntegers)(oneTwoThree))),
    [-1, -2, -3, -4, -5, -6, -7, -8]
  )
  t.same(
    processIterable(takeEight(concat(negativeIntegers, negativeIntegers))),
    [-1, -2, -3, -4, -5, -6, -7, -8]
  )
})
