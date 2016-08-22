import test from 'ava'
import {sum} from '../'
import {oneTwoThree, oneTwoThreeFour} from './_tools'

test('sort', t => {
  t.deepEqual(sum([]), 0)
  t.deepEqual(sum([64]), 64)
  t.deepEqual(sum(oneTwoThree), 6)
  t.deepEqual(sum(oneTwoThreeFour), 10)
})
