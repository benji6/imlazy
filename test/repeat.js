const test = require('tape')
const {repeat} = require('../')
const {
  fiveFiveFive,
  testAndToArray,
  takeThree,
} = require('./_tools')

test('repeat', t => {
  const processIterable = testAndToArray(t)
  const repeatFive = repeat(5)
  t.deepEqual(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.deepEqual(processIterable(takeThree(repeatFive)), fiveFiveFive)
  t.deepEqual(processIterable(takeThree(repeat(5))), fiveFiveFive)
  t.end()
})
