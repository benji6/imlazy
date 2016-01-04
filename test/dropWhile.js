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
  const threeFour = dropWhileNotEqual3(oneTwoThreeFour)
  t.same(processIterable(threeFour), [3, 4])
  t.same(processIterable(threeFour), [3, 4])
  t.same(processIterable(threeFour), [3, 4])
  t.same(processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))), [3, 4, 5])
  t.same(processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))), [3, 4, 5])
  t.same(processIterable(dropWhile(a => a !== 12321, oneTwoThreeFour)), [])
})
