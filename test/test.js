const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  double,
  isFrozenToArray,
  negativeIntegers,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  takeThree,
  threeTwoOne
} from './_tools'

const append = src.append
const assoc = src.assoc
const every = src.every
const find = src.find
const findIndex = src.findIndex
const flatten = src.flatten
const insert = src.insert
const insertAll = src.insertAll
const intersperse = src.intersperse
const iterableFrom = src.iterableFrom
const iterableOf = src.iterableOf
const iterate = src.iterate
const last = src.last
const length = src.length
const makeCircular = src.makeCircular
const map = src.map
const nth = src.nth
const partition = src.partition
const prepend = src.prepend
const range = src.range
const remove = src.remove
const repeat = src.repeat
const reverse = src.reverse
const some = src.some
const sort = src.sort
const splitEvery = src.splitEvery
const takeWhile = src.takeWhile
const transpose = src.transpose
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1])
const fiveFiveFive = Object.freeze([5, 5, 5])
const infiniteIterableOfPositiveIntegers = repeat(positiveIntegers)
const isEven = x => x % 2 === 0

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(processIterable(append(4, immutableOneTwoThree)),
               oneTwoThreeFour)
})

test('append', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(append(4)([])),
               [4])
  t.same(processIterable(append(4, oneTwoThree)),
               oneTwoThreeFour)
})

test('assoc', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(assoc(4)(100)(positiveIntegers))),
               [1, 2, 3, 4, 100, 6, 7, 8])
  t.same(processIterable(takeEight(assoc(4, 100)(positiveIntegers))),
               [1, 2, 3, 4, 100, 6, 7, 8])
  t.same(processIterable(takeEight(assoc(4)(100, positiveIntegers))),
               [1, 2, 3, 4, 100, 6, 7, 8])
})

test('every', t => {
  t.same(every(x => x === 5)(fiveFiveFive),
               true)
  t.same(every(x => x === 30, fiveFiveFive),
               false)
})

test('find', t => {
  t.same(find(x => x === 1)(positiveIntegers),
               1)
  t.same(find(x => x === 3)(positiveIntegers),
               3)
  t.same(find(x => x === 4, oneTwoThree),
               undefined)
})

test('findIndex', t => {
  t.same(findIndex(x => x === -1)(negativeIntegers),
               0)
  t.same(findIndex(x => x === -30)(negativeIntegers),
               29)
  t.same(findIndex(x => x === -4, oneTwoThree),
               undefined)
})

test('flatten', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(flatten([oneTwoThree, threeTwoOne, oneTwoThreeFour])),
               [...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour])
  t.same(processIterable(flatten([1, oneTwoThree, threeTwoOne, oneTwoThreeFour])),
               [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour])
  t.same(processIterable(flatten([1, [[[[oneTwoThree]]]], threeTwoOne, oneTwoThreeFour])),
               [1, ...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour])
  t.same(processIterable(takeEight(flatten([oneTwoThree, positiveIntegers]))),
               [...oneTwoThree, ...oneTwoThreeFour, 5])
  t.same(processIterable(takeEight(flatten(infiniteIterableOfPositiveIntegers))),
               [1, 2, 3, 4, 5, 6, 7, 8])
})

test('insert', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(insert(2)(20)(positiveIntegers))),
               [1, 2, 20, 3, 4, 5, 6, 7])
  t.same(processIterable(takeEight(insert(2, 20)(positiveIntegers))),
               [1, 2, 20, 3, 4, 5, 6, 7])
})

test('insertAll', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(insertAll(2)([20, 21, 22])(positiveIntegers))),
               [1, 2, 20, 21, 22, 3, 4, 5])
  t.same(processIterable(takeEight(insertAll(2, negativeIntegers)(positiveIntegers))),
               [1, 2, -1, -2, -3, -4, -5, -6])
})

test('intersperse', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(intersperse(2)(positiveIntegers))),
               [1, 2, 2, 2, 3, 2, 4, 2])
  t.same(processIterable(takeEight(intersperse(2, positiveIntegers))),
               [1, 2, 2, 2, 3, 2, 4, 2])
})

test('iterableFrom', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(iterableFrom(oneTwoThree)),
               oneTwoThree)
})

test('iterableOf', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(iterableOf(1, 2, 3)),
               oneTwoThree)
})

test('iterate', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(iterate(double)(1))),
               [1, 2, 4, 8, 16, 32, 64, 128])
  t.same(processIterable(takeEight(iterate(double, 1))),
               [1, 2, 4, 8, 16, 32, 64, 128])
})

test('last', t => {
  t.same(last([]),
               undefined)
  t.same(last(oneTwoThree),
               3)
})

test('length', t => {
  t.same(length(oneTwoThree),
               3)
})

test('makeCircular', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(makeCircular(range(1)(3)))),
               [1, 2, 3, 1, 2, 3, 1, 2])
})

test('nth', t => {
  const second = nth(1)
  t.same(nth(0)(positiveIntegers),
               1)
  t.same(nth(256, positiveIntegers),
               257)
  t.same(second(positiveIntegers),
               2)
  t.same(second(negativeIntegers),
               -2)
})

test('partition', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(partition(isEven)(oneTwoThreeFour)).map(processIterable),
               [[2, 4], [1, 3]])
  t.same(processIterable(partition(isEven, oneTwoThreeFour)).map(processIterable),
               [[2, 4], [1, 3]])
})

test('prepend', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(prepend(1)([])),
               [1])
  t.same(processIterable(takeEight(prepend(0, positiveIntegers))),
               [0, 1, 2, 3, 4, 5, 6, 7])
})

test('remove', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeEight(remove(2)(4)(positiveIntegers))),
               [1, 2, 7, 8, 9, 10, 11, 12])
  t.same(processIterable(takeEight(remove(2, 4, positiveIntegers))),
               [1, 2, 7, 8, 9, 10, 11, 12])
})

test('repeat', t => {
  const processIterable = isFrozenToArray(t)
  const repeatFive = repeat(5)
  t.same(processIterable(takeThree(repeatFive)),
               fiveFiveFive)
  t.same(processIterable(takeThree(repeatFive)),
               fiveFiveFive)
  t.same(processIterable(takeThree(repeat(5))),
               fiveFiveFive)
})

test('reverse', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(reverse(oneTwoThree)),
               threeTwoOne)
})

test('some', t => {
  t.same(some(x => x === 30)(positiveIntegers),
               true)
  t.same(some(x => x === 30, oneTwoThree),
               false)
})

test('sort', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(sort((a, b) => a > b)(oneTwoThreeFour)),
               oneTwoThreeFour)
  t.same(processIterable(sort((a, b) => a < b, oneTwoThreeFour)),
               fourThreeTwoOne)
})

test('splitEvery', t => {
  const processIterable = isFrozenToArray(t)
  const splitEveryThree = splitEvery(3)
  t.same(processIterable(splitEveryThree(oneTwoThreeFour)).map(processIterable),
               [[1, 2, 3], [4]])
  t.same(processIterable(takeThree(splitEveryThree(positiveIntegers))).map(processIterable),
               [[1, 2, 3], [4, 5, 6], [7, 8, 9]])
})

test('take', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeThree([1])),
               [1])
  t.same(processIterable(takeThree(oneTwoThreeFour)),
               oneTwoThree)
  t.same(processIterable(takeThree(positiveIntegers)),
               oneTwoThree)
  t.same(processIterable(takeThree(map(double)(positiveIntegers))),
               [2, 4, 6])
  t.same(processIterable(map(double)(takeThree(positiveIntegers))),
               [2, 4, 6])
})

test('takeWhile', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(takeWhile(a => a !== 5)(oneTwoThreeFour)),
               oneTwoThreeFour)
  t.same(processIterable(takeWhile(a => a !== 4)(oneTwoThreeFour)),
               oneTwoThree)
  t.same(processIterable(takeWhile(a => a !== 4, positiveIntegers)),
               oneTwoThree)
})

test('transpose', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(transpose([oneTwoThreeFour, oneTwoThree, oneTwoThree])).map(processIterable),
               [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4]])
  t.same(processIterable(takeEight(transpose([oneTwoThree, negativeIntegers, positiveIntegers, [64]]))).map(takeEight).map(processIterable),
               [[1, -1, 1, 64], [2, -2, 2], [3, -3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [-8, 8]])
  t.same(processIterable(takeThree(infiniteIterableOfPositiveIntegers)).map(takeThree).map(processIterable),
               [oneTwoThree, oneTwoThree, oneTwoThree])
})
