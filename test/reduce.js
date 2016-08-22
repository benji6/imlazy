import test from 'ava'
import {reduce} from '../'
import {add, oneTwoThree, oneTwoThreeFour} from './_tools'

test('reduce', t => {
  const sum = reduce(add)(0)
  t.deepEqual(sum(oneTwoThree), 6)
  t.deepEqual(sum(oneTwoThreeFour), 10)
  t.deepEqual(reduce(add, 0, oneTwoThreeFour), 10)
})
