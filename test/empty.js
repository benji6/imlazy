const test = require('tape')
const { empty } = require('../')
const { testAndToArray } = require('./_tools')

test('empty', t => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(empty()), [])
  t.end()
})
