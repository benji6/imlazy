import test from 'ava'
import {findIndex} from '../'
import {oneTwoThree, negativeIntegers} from './_tools'

test('findIndex', t => {
  t.deepEqual(findIndex(x => x === -1)(negativeIntegers), 0)
  t.deepEqual(findIndex(x => x === -30)(negativeIntegers), 29)
  t.deepEqual(findIndex(x => x === -4, oneTwoThree), undefined)
})
