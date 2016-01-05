import test from 'ava'
import {head} from '../'
import {positiveIntegers, oneTwoThree} from './_tools'

test('head', t => {
  t.same(head([]), undefined)
  t.same(head(positiveIntegers), 1)
  t.same(head(oneTwoThree), 1)
})
