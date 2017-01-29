const test = require('tape')
const {nth} = require('../')
const {negativeIntegers, positiveIntegers} = require('./_tools')

test('nth', t => {
  const second = nth(1)
  t.deepEqual(nth(0)(positiveIntegers), 1)
  t.deepEqual(nth(256, positiveIntegers), 257)
  t.deepEqual(second(positiveIntegers), 2)
  t.deepEqual(second(negativeIntegers), -2)
  t.end()
})
