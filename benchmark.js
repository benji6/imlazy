const Benchmark = require('benchmark')
const imlazy = require('./')
const R = require('ramda')

const filter = imlazy.filter
const map = imlazy.map

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

const ramdaTransducerBenchmark = R.transduce(R.compose(
  R.map(add10),
  R.map(triple),
  R.filter(divisibleBy5),
  R.filter(isEven)
), R.flip(R.append), [])

new Benchmark.Suite()
  .add('imlazy', function () { imlazyBenchmark(testData) })
  .add('native', function () { nativeBenchmark(testData) })
  .add('ramda', function () { ramdaBenchmark(testData) })
  .add('ramdaTransducer', function () { ramdaTransducerBenchmark(testData) })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest').pluck('name')}\n`)
  })
  .run({async: true})
