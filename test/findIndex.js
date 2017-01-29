const test = require('tape')
const {findIndex} = require('../')
const {oneTwoThree, negativeIntegers} = require('./_tools')

test('findIndex', t => {
  t.deepEqual(findIndex(x => x === -1)(negativeIntegers), 0)
  t.deepEqual(findIndex(x => x === -30)(negativeIntegers), 29)
  t.deepEqual(findIndex(x => x === -4, oneTwoThree), undefined)
  t.end()
})
