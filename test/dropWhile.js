const test = require('tape')
const { dropWhile } = require('../')
const {
  testAndToArray,
  oneTwoThreeFour,
  positiveIntegers,
  takeThree,
} = require('./_tools')

test('dropWhile', t => {
  const processIterable = testAndToArray(t)
  const dropWhileNotEqual3 = dropWhile(a => a !== 3)
  const threeFour = dropWhileNotEqual3(oneTwoThreeFour)
  t.deepEqual(processIterable(threeFour), [3, 4])
  t.deepEqual(processIterable(threeFour), [3, 4])
  t.deepEqual(processIterable(threeFour), [3, 4])
  t.deepEqual(
    processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))),
    [3, 4, 5],
  )
  t.deepEqual(
    processIterable(takeThree(dropWhileNotEqual3(positiveIntegers))),
    [3, 4, 5],
  )
  t.deepEqual(processIterable(dropWhile(a => a !== 12321, oneTwoThreeFour)), [])
  t.end()
})
