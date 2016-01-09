import test from 'ava'
import {takeWhile} from '../'
import {
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers
} from './_tools'

test('takeWhile', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(takeWhile(a => a !== 5)(oneTwoThreeFour)),
    oneTwoThreeFour
  )
  t.same(
    processIterable(takeWhile(a => a !== 4)(oneTwoThreeFour)),
    oneTwoThree
  )
  t.same(
    processIterable(takeWhile(a => a !== 4, positiveIntegers)),
    oneTwoThree
  )
})
