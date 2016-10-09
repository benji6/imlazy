'use strict'

const Benchmark = require('benchmark')
const I = require('./')
const R = require('ramda')

const length = 1024
const testArray = Array.from({length}, (_, i) => i)
const testInfiniteIterable = {[Symbol.iterator]: function * () {
  let i = 0
  while (true) yield i++
}}

const add10 = x => x + 10
const divisibleBy5 = x => x % 5 === 0
const isEven = x => x % 2 === 0
const triple = x => 3 * x

const imLazyTransform = R.compose(
  I.filter(isEven),
  I.filter(divisibleBy5),
  I.map(triple),
  I.map(add10)
)

const ramdaTransform = R.compose(
  R.filter(isEven),
  R.filter(divisibleBy5),
  R.map(triple),
  R.map(add10)
)

const imlazyArrayBenchmark = data => Array.from(imLazyTransform(data))

const nativeArrayBenchmark = data => data
  .map(add10)
  .map(triple)
  .filter(divisibleBy5)
  .filter(isEven)

const ramdaArrayBenchmark = ramdaTransform

const ramdaTransducerArrayBenchmark = R.into([], ramdaTransform)

const ramdaTransducerInfiniteBenchmark = R.into([], R.compose(R.take(length), ramdaTransform))

const imlazyInfiniteBenchmark = data => Array.from(I.take(length, imLazyTransform(data)))

new Benchmark.Suite()
  .add('infiniteIterable - imlazy', function () { imlazyInfiniteBenchmark(testInfiniteIterable) })
  .add('infiniteIterable - ramdaTransducer', function () { ramdaTransducerInfiniteBenchmark(testInfiniteIterable) })
  .add('array - imlazy', function () { imlazyArrayBenchmark(testArray) })
  .add('array - ramdaTransducer', function () { ramdaTransducerArrayBenchmark(testArray) })
  .add('array - native', function () { nativeArrayBenchmark(testArray) })
  .add('array - ramda', function () { ramdaArrayBenchmark(testArray) })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest').map('name')}\n`)
  })
  .run({async: true})
