import test from 'ava'
import {nth} from '../'
import {negativeIntegers, positiveIntegers} from './_tools'

test('nth', t => {
  const second = nth(1)
  t.same(nth(0)(positiveIntegers), 1)
  t.same(nth(256, positiveIntegers), 257)
  t.same(second(positiveIntegers), 2)
  t.same(second(negativeIntegers), -2)
})
