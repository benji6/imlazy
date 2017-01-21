import test from 'ava'
import {chain, of} from '../'
import {
  testAndToArray,
  oneTwoThree,
  positiveIntegers,
  takeEight
} from './_tools'

test('chain', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(chain(x => of(x, x), oneTwoThree)),
    [1, 1, 2, 2, 3, 3]
  )
})

test('chain', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(chain(x => of(x, x), positiveIntegers))),
    [1, 1, 2, 2, 3, 3, 4, 4]
  )
})
