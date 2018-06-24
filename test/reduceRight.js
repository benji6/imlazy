const test = require('tape')
const {reduceRight} = require('../')
const {add, oneTwoThree, oneTwoThreeFour, subtract} = require('./_tools')

test('reduceRight', t => {
  const sum = reduceRight(add)(0)
  t.deepEqual(sum(oneTwoThree), 6)
  t.deepEqual(sum(oneTwoThreeFour), 10)
  t.deepEqual(reduceRight(add, 0, oneTwoThreeFour), 10)
  t.deepEqual(reduceRight(subtract, 0, oneTwoThreeFour), -2)
  t.end()
})
