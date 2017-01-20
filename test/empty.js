import test from 'ava'
import {empty} from '../'
import {testAndToArray} from './_tools'

test('empty', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(empty()), [])
})
