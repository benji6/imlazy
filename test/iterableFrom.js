const test = require('tape')
const { iterableFrom } = require('../')
const { testAndToArray, oneTwoThree } = require('./_tools')

test('iterableFrom', (t) => {
  const processIterable = testAndToArray(t)
  t.deepEqual(processIterable(iterableFrom(oneTwoThree)), oneTwoThree)
  t.end()
})
