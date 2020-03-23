const test = require('tape')
const { length } = require('../')
const { oneTwoThree } = require('./_tools')

test('length', (t) => {
  t.deepEqual(length(oneTwoThree), 3)
  t.end()
})
