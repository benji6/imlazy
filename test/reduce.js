const test = require('tape')
const {reduce} = require('../')
const {add, oneTwoThree, oneTwoThreeFour, subtract} = require('./_tools')

test('reduce', t => {
  const sum = reduce(add)(0)
  t.deepEqual(sum(oneTwoThree), 6)
  t.deepEqual(sum(oneTwoThreeFour), 10)
  t.deepEqual(reduce(add, 0, oneTwoThreeFour), 10)
  t.deepEqual(reduce(subtract, 0, oneTwoThreeFour), -10)
  t.end()
})
