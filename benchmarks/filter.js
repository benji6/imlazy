'use strict'

const assert = require('assert')
const Benchmark = require('benchmark')
const consumeIterable = require('./_consumeIterable')
const I = require('../')

const length = 1024
const testArray = Array.from({length}, (_, i) => i)

const add1 = x => x + 1
const divide2 = x => x / 2
const mult3 = x => 3 * x

const imlazyOnceBenchmark = xs => consumeIterable(
  I.filter(add1, xs)
)

const nativeOnceBenchmark = xs => consumeIterable(xs
  .filter(add1))

const imlazyTwiceBenchmark = xs => consumeIterable(
  I.filter(divide2,
    I.filter(add1, xs))
)

const nativeTwiceBenchmark = xs => consumeIterable(xs
  .filter(add1)
  .filter(divide2))

const imlazyThriceBenchmark = xs => consumeIterable(
  I.filter(mult3,
    I.filter(divide2,
      I.filter(add1, xs)))
)

const nativeThriceBenchmark = xs => consumeIterable(xs
  .filter(add1)
  .filter(divide2)
  .filter(mult3))

assert.deepEqual(imlazyOnceBenchmark(testArray), nativeOnceBenchmark(testArray))
assert.deepEqual(imlazyTwiceBenchmark(testArray), nativeTwiceBenchmark(testArray))
assert.deepEqual(imlazyThriceBenchmark(testArray), nativeThriceBenchmark(testArray))

new Benchmark.Suite()
  .add('imlazy - filter 1x over array', () => { imlazyOnceBenchmark(testArray) })
  .add('native - filter 1x over array', () => { nativeOnceBenchmark(testArray) })
  .add('imlazy - filter 2x over array', () => { imlazyTwiceBenchmark(testArray) })
  .add('native - filter 2x over array', () => { nativeTwiceBenchmark(testArray) })
  .add('imlazy - filter 3x over array', () => { imlazyThriceBenchmark(testArray) })
  .add('native - filter 3x over array', () => { nativeThriceBenchmark(testArray) })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest').filter('name')}\n`)
  })
  .run({async: true})
