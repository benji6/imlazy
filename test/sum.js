import test from 'ava'
import {sum} from '../'
import {oneTwoThree, oneTwoThreeFour} from './_tools'

test('sort', t => {
  t.same(sum([]), 0)
  t.same(sum([64]), 64)
  t.same(sum(oneTwoThree), 6)
  t.same(sum(oneTwoThreeFour), 10)
})
