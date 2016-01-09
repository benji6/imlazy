import test from 'ava'
import {length} from '../'
import {oneTwoThree} from './_tools'

test('length', t => {
  t.same(length(oneTwoThree), 3)
})
