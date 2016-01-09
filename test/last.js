import test from 'ava'
import {last} from '../'
import {oneTwoThree} from './_tools'

test('last', t => {
  t.same(last([]), undefined)
  t.same(last(oneTwoThree), 3)
})
