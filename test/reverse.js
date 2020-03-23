const test = require('tape')
const { reverse } = require('../')
const { testAndToArray, oneTwoThree, threeTwoOne } = require('./_tools')

test('reverse', (t) => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(reverse(oneTwoThree)), threeTwoOne)
  t.end()
})
