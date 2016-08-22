import test from 'ava'
import {some} from '../'
import {oneTwoThree, positiveIntegers} from './_tools'

test('some', t => {
  t.deepEqual(some(x => x === 30)(positiveIntegers), true)
  t.deepEqual(some(x => x === 30, oneTwoThree), false)
})
