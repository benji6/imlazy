import test from 'ava'
import {reduce} from '../'
import {add, oneTwoThree, oneTwoThreeFour} from './_tools'

test('reduce', t => {
  const sum = reduce(add)(0)
  t.same(sum(oneTwoThree), 6)
  t.same(sum(oneTwoThreeFour), 10)
  t.same(reduce(add, 0, oneTwoThreeFour), 10)
})
