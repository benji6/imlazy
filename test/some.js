const test = require('tape')
const {some} = require('../')
const {oneTwoThree, positiveIntegers} = require('./_tools')

test('some', t => {
  t.deepEqual(some(x => x === 30)(positiveIntegers), true)
  t.deepEqual(some(x => x === 30, oneTwoThree), false)
  t.end()
})
