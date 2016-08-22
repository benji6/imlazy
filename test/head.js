import test from 'ava'
import {head} from '../'
import {positiveIntegers, oneTwoThree} from './_tools'

test('head', t => {
  t.deepEqual(head([]), undefined)
  t.deepEqual(head(positiveIntegers), 1)
  t.deepEqual(head(oneTwoThree), 1)
})
