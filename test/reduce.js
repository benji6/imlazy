const test = require('tape')
const { reduce } = require('../')
const { add, oneTwoThree, oneTwoThreeFour, subtract } = require('./_tools')

test('reduce', t => {
  const sum = reduce(add)(0)
  t.strictEqual(sum(oneTwoThree), 6)
  t.strictEqual(sum(oneTwoThreeFour), 10)
  t.strictEqual(reduce(add, 0, oneTwoThreeFour), 10)
  t.strictEqual(reduce(subtract, 0, oneTwoThreeFour), -10)
  t.strictEqual(reduce(add, 'a', ['b', 'c', 'd', 'e']), 'abcde')
  t.end()
})
