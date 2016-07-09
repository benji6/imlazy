import test from 'ava'
import {reject, range, take} from '../'
import {testAndToArray} from './_tools'

test('reject', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(take(3, reject(x => x <= 3, range(1, Infinity)))),
    [4, 5, 6]
  )
})
