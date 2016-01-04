import test from 'ava'
import {dropWhile} from '../'
import {
  isFrozenToArray,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree
} from './_tools'

test('dropWhile', t => {
  const processIterable = isFrozenToArray(t)
  const dropWhileNotEqual3 = dropWhile(a => a !== 3)
  t.same(processIterable(dropWhileNotEqual3(oneTwoThreeFour)), [3, 4])
  t.same(processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))), [3, 4, 5])
  t.same(processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))), [3, 4, 5])
  t.same(processIterable(dropWhile(a => a !== 12321, oneTwoThreeFour)), [])
})
