const test = require('tape')
const { every } = require('../')
const { fiveFiveFive } = require('./_tools')

test('every', (t) => {
  t.deepEqual(every((x) => x === 5)(fiveFiveFive), true)
  t.deepEqual(
    every((x) => x === 30, fiveFiveFive),
    false,
  )
  t.end()
})
