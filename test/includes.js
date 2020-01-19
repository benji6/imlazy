const test = require('tape')
const { includes } = require('../')
const { oneTwoThree, positiveIntegers } = require('./_tools')

test('head', t => {
  t.true(includes(1, oneTwoThree))
  t.true(includes(1)(oneTwoThree))
  t.true(includes(1, positiveIntegers))
  t.false(includes(123)(oneTwoThree))
  t.end()
})
