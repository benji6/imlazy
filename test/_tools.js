'use strict'

const {map, range, repeat, take} = require('../')

const spreadUpTo1024 = xs => {
  const ys = []
  for (const x of xs) {
    ys.push(x)
    if (ys.length === 1024) return ys
  }
  return ys
}

const deepToArray = iter => spreadUpTo1024(iter).map(x => x[Symbol.iterator] ? spreadUpTo1024(x) : x)

module.exports.add = (a, b) => a + b
module.exports.oneTwoThree = Object.freeze([1, 2, 3])
module.exports.oneTwoThreeFour = Object.freeze([1, 2, 3, 4])
module.exports.fibonacciNumbers = {* [Symbol.iterator] () {
  let a = 1
  let b = 1
  while (true) {
    yield a
    const c = a + b
    a = b
    b = c
  }
}}
module.exports.double = x => x * 2
module.exports.emptyIterable = {* [Symbol.iterator] () {}}
module.exports.fiveFiveFive = Object.freeze([5, 5, 5])
module.exports.halve = x => x / 2
module.exports.isEven = x => x % 2 === 0
module.exports.testAndToArray = t => iter => {
  t.throws(() => iter.a = 1)
  t.is(iter.toString.name, 'imlazyToStringThunk')
  t.deepEqual(deepToArray(iter), deepToArray(iter), 'Can spread twice')
  return [...iter]
}
module.exports.negativeIntegers = range(-1)(-Infinity)
module.exports.positiveIntegers = range(1)(Infinity)
module.exports.infiniteIterableOfPositiveIntegers = repeat(module.exports.positiveIntegers)
module.exports.subtract = (a, b) => a - b
module.exports.takeEight = take(8)
module.exports.takeThree = take(3)
module.exports.threeTwoOne = Object.freeze([3, 2, 1])
module.exports.throwOnThird = map(n => {
  if (n === 3) throw new Error('too eager!')
  return n
}, module.exports.oneTwoThree)
module.exports.fourThreeTwoOne = Object.freeze([4, 3, 2, 1])
