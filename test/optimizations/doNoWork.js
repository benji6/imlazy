const test = require('tape')
const {
  drop,
  map,
  range,
  slice,
} = require('../..')
const {positiveIntegers} = require('../_tools')

test('doNoWork - drop', t => {
  const drop8 = drop(8)
  let invocationCount = 0
  const incrementInvocationCount = map(() => invocationCount++)
  ;[...drop8(incrementInvocationCount(range(0, 15)))]
  t.equal(invocationCount, 8)
  invocationCount = 0
  ;[...drop8(incrementInvocationCount(incrementInvocationCount(range(0, 15))))]
  t.equal(invocationCount, 16)
  invocationCount = 0
  ;[...incrementInvocationCount(drop8(drop8(incrementInvocationCount(range(0, 15)))))]
  t.equal(invocationCount, 0)
  t.end()
})

test('doNoWork - slice', t => {
  const sliceIt = slice(100, 108)
  let invocationCount = 0
  const incrementInvocationCount = map(() => invocationCount++)
  ;[...sliceIt(incrementInvocationCount(positiveIntegers))]
  t.equal(invocationCount, 8)
  invocationCount = 0
  ;[...sliceIt(incrementInvocationCount(incrementInvocationCount(positiveIntegers)))]
  t.equal(invocationCount, 16)
  invocationCount = 0
  ;[...incrementInvocationCount(sliceIt(sliceIt(incrementInvocationCount(positiveIntegers))))]
  t.equal(invocationCount, 0)
  t.end()
})
