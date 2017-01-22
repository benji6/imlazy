import test from 'ava'
import {isEmpty, range} from '../'

test('isEmpty', t => {
  t.is(isEmpty([]), true)
  t.is(isEmpty({* [Symbol.iterator] () {}}), true)
  t.is(isEmpty([0]), false)
  t.is(isEmpty(range(1, Infinity)), false)
})
