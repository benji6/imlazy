import test from 'ava'
import {last} from '../'
import {oneTwoThree} from './_tools'

test('last', t => {
  t.deepEqual(last([]), undefined)
  t.deepEqual(last(oneTwoThree), 3)
})
