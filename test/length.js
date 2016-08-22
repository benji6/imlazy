import test from 'ava'
import {length} from '../'
import {oneTwoThree} from './_tools'

test('length', t => {
  t.deepEqual(length(oneTwoThree), 3)
})
