import test from 'ava'
import {find} from '../'
import {oneTwoThree, positiveIntegers} from './_tools'

test('find', t => {
  t.same(find(x => x === 1)(positiveIntegers), 1)
  t.same(find(x => x === 3)(positiveIntegers), 3)
  t.same(find(x => x === 4, oneTwoThree), undefined)
})
