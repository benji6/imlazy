import test from 'ava'
import {some} from '../'
import {oneTwoThree, positiveIntegers} from './_tools'

test('some', t => {
  t.same(some(x => x === 30)(positiveIntegers), true)
  t.same(some(x => x === 30, oneTwoThree), false)
})
