const test = require('tape')
const {last} = require('../')
const {oneTwoThree} = require('./_tools')

test('last', t => {
  t.deepEqual(last([]), undefined)
  t.deepEqual(last(oneTwoThree), 3)
  t.end()
})
