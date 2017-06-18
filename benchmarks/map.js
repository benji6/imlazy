'use strict'

const assert = require('assert')
const Benchmark = require('benchmark')
const consumeIterable = require('./_consumeIterable')
const I = require('../')

const length = 1024
const testArray = Array.from({length}, (_, i) => i)

const add1 = x => x + 1
const halve = x => x / 2
const triple = x => 3 * x

const imlazyOnceBenchmark = xs => consumeIterable(
  I.map(add1, xs)
)

const nativeOnceBenchmark = xs => consumeIterable(xs
  .map(add1))

const imlazyTwiceBenchmark = xs => consumeIterable(
  I.map(halve,
    I.map(add1, xs))
)

const nativeTwiceBenchmark = xs => consumeIterable(xs
  .map(add1)
  .map(halve))

const imlazyThriceBenchmark = xs => consumeIterable(
  I.map(triple,
    I.map(halve,
      I.map(add1, xs)))
)

const nativeThriceBenchmark = xs => consumeIterable(xs
  .map(add1)
  .map(halve)
  .map(triple))

assert.deepEqual(imlazyOnceBenchmark(testArray), nativeOnceBenchmark(testArray))
assert.deepEqual(imlazyTwiceBenchmark(testArray), nativeTwiceBenchmark(testArray))
assert.deepEqual(imlazyThriceBenchmark(testArray), nativeThriceBenchmark(testArray))

new Benchmark.Suite()
  .add('imlazy - map 1x over array', () => { imlazyOnceBenchmark(testArray) })
  .add('native - map 1x over array', () => { nativeOnceBenchmark(testArray) })
  .add('imlazy - map 2x over array', () => { imlazyTwiceBenchmark(testArray) })
  .add('native - map 2x over array', () => { nativeTwiceBenchmark(testArray) })
  .add('imlazy - map 3x over array', () => { imlazyThriceBenchmark(testArray) })
  .add('native - map 3x over array', () => { nativeThriceBenchmark(testArray) })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest').map('name')}\n`)
  })
  .run({async: true})
