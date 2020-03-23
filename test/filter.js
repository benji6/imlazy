const test = require('tape')
const { filter, range } = require('../')
const { testAndToArray, oneTwoThree } = require('./_tools')

test('filter', (t) => {
  const processIterable = testAndToArray(t)
  const anotherOneTwoThree = filter((x) => x <= 3, range(1, 100))
  t.deepEqual(
    processIterable(filter((x) => x <= 3)(range(1, 100))),
    oneTwoThree,
  )
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.end()
})
