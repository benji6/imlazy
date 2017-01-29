const test = require('tape')
const {head} = require('../')
const {positiveIntegers, oneTwoThree} = require('./_tools')

test('head', t => {
  t.deepEqual(head([]), undefined)
  t.deepEqual(head(positiveIntegers), 1)
  t.deepEqual(head(oneTwoThree), 1)
  t.end()
})
