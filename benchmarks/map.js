'use strict'

const assert = require('assert')
const Benchmark = require('benchmark')
const I = require('../')

const length = 1024
const testArray = [...Array(length).keys()]

const add1 = x => x + 1
const halve = x => x / 2
const triple = x => 3 * x

const imlazyOnceBenchmark = xs => [...I.map(add1, xs)]

const nativeOnceBenchmark = xs => xs.map(add1)

const imlazyTwiceBenchmark = xs => [...I.map(halve, I.map(add1, xs))]

const nativeTwiceBenchmark = xs => xs.map(add1).map(halve)

const imlazyThriceBenchmark = xs => [
  ...I.map(triple, I.map(halve, I.map(add1, xs))),
]

const nativeThriceBenchmark = xs =>
  xs
    .map(add1)
    .map(halve)
    .map(triple)

assert.deepEqual(imlazyOnceBenchmark(testArray), nativeOnceBenchmark(testArray))
assert.deepEqual(
  imlazyTwiceBenchmark(testArray),
  nativeTwiceBenchmark(testArray),
)
assert.deepEqual(
  imlazyThriceBenchmark(testArray),
  nativeThriceBenchmark(testArray),
)

new Benchmark.Suite()
  .add('imlazy - map 1x over array', () => {
    imlazyOnceBenchmark(testArray)
  })
  .add('native - map 1x over array', () => {
    nativeOnceBenchmark(testArray)
  })
  .add('imlazy - map 2x over array', () => {
    imlazyTwiceBenchmark(testArray)
  })
  .add('native - map 2x over array', () => {
    nativeTwiceBenchmark(testArray)
  })
  .add('imlazy - map 3x over array', () => {
    imlazyThriceBenchmark(testArray)
  })
  .add('native - map 3x over array', () => {
    nativeThriceBenchmark(testArray)
  })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function() {
    process.stdout.write(`Fastest is ${this.filter('fastest').map('name')}\n`)
  })
  .run({ async: true })
