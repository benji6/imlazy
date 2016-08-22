import test from 'ava'
import {repeat} from '../'
import {
  fiveFiveFive,
  testAndToArray,
  takeThree
} from './_tools'

test('repeat', t => {
  const processIterable = testAndToArray(t)
  const repeatFive = repeat(5)
  t.deepEqual(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.deepEqual(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.deepEqual(processIterable(takeThree(repeat(5))), fiveFiveFive)
})
