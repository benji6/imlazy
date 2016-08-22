import test from 'ava'
import {cycle, range} from '../'
import {testAndToArray, takeEight} from './_tools'

test('cycle', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(
    processIterable(takeEight(cycle(range(1)(3)))),
    [1, 2, 3, 1, 2, 3, 1, 2]
  )
})
