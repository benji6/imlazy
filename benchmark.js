import Benchmark from 'benchmark'
import {filter, map} from './src/'
import R from 'ramda';

const testData = Object.freeze(Array.from({length: 1024}, (_, i) => i))

const add10 = x => x + 10
const triple = x => 3 * x
const divisibleBy5 = x => x % 5 === 0
const isEven = x => x % 2 === 0

const imlazyBenchmark = data => Array.from(filter(isEven,
                                                  filter(divisibleBy5,
                                                         map(triple,
                                                             map(add10,
                                                                 data)))))

const nativeBenchmark = data => data.map(add10)
                                   .map(triple)
                                   .filter(divisibleBy5)
                                   .filter(isEven)

const ramdaBenchmark = data => R.filter(isEven,
                                        R.filter(divisibleBy5,
                                                 R.map(triple,
                                                       R.map(add10,
                                                             data))))

new Benchmark.Suite()
  .add('imlazy', function () {imlazyBenchmark(testData)})
  .add('native', function () {nativeBenchmark(testData)})
  .add('ramda', function () {ramdaBenchmark(testData)})
  .on('cycle', ({target}) => process.stdout.write(`${String(target)}\n`))
  .on('complete', function () {process.stdout.write(`Fastest is ${this.filter('fastest').pluck('name')}\n`)})
  .run({async: true});
