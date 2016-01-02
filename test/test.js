const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  add,
  double,
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight
} from './_tools'

const append = src.append
const assoc = src.assoc
const concat = src.concat
const drop = src.drop
const dropWhile = src.dropWhile
const every = src.every
const filter = src.filter
const find = src.find
const findIndex = src.findIndex
const flatten = src.flatten
const head = src.head
const insert = src.insert
const insertAll = src.insertAll
const intersperse = src.intersperse
const isEmpty = src.isEmpty
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
const slice = src.slice
const some = src.some
const sort = src.sort
const splitEvery = src.splitEvery
const tail = src.tail
const take = src.take
const takeWhile = src.takeWhile
const transpose = src.transpose
const zip = src.zip
const zipWith = src.zipWith
const threeTwoOne = Object.freeze([3, 2, 1])
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1])
const fiveFiveFive = Object.freeze([5, 5, 5])
const negativeIntegers = range(-1)(-Infinity)
const infiniteIterableOfPositiveIntegers = repeat(positiveIntegers)
const subtract = (a, b) => a - b
const halve = x => x / 2
const takeThree = take(3)
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

test('concat', t => {
  const concatOneTwoThree = concat(oneTwoThree)
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(concatOneTwoThree(threeTwoOne)),
               [1, 2, 3, 3, 2, 1])
  t.same(processIterable(takeEight(concatOneTwoThree(negativeIntegers))),
               [1, 2, 3, -1, -2, -3, -4, -5])
  t.same(processIterable(takeEight(concat(negativeIntegers)(oneTwoThree))),
               [-1, -2, -3, -4, -5, -6, -7, -8])
  t.same(processIterable(takeEight(concat(negativeIntegers, negativeIntegers))),
               [-1, -2, -3, -4, -5, -6, -7, -8])
})

test('drop', t => {
  const processIterable = isFrozenToArray(t)
  const dropOne = drop(1)
  t.same(processIterable(dropOne(oneTwoThreeFour)),
               [2, 3, 4])
  t.same(processIterable(dropOne(oneTwoThreeFour)),
               [2, 3, 4])
  t.same(processIterable(drop(3)(oneTwoThreeFour)),
               [4])
  t.same(processIterable(drop(30, oneTwoThree)),
               [])
})

test('dropWhile', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(dropWhile(a => a !== 3)(oneTwoThreeFour)),
               [3, 4])
  t.same(processIterable(dropWhile(a => a !== 12321, oneTwoThreeFour)),
               [])
})

test('every', t => {
  t.same(every(x => x === 5)(fiveFiveFive),
               true)
  t.same(every(x => x === 30, fiveFiveFive),
               false)
})

test('filter', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(filter(x => x <= 3, range(1, 100))),
               oneTwoThree)
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

test('head', t => {
  t.same(head([]),
               undefined)
  t.same(head(positiveIntegers),
               1)
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

test('isEmpty', t => {
  t.is(isEmpty([]), true)
  t.is(isEmpty([0]), false)
  t.is(isEmpty(range(1, Infinity)), false)
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

test('map', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(map(halve)([2, 4, 6])),
               oneTwoThree)
  t.same(processIterable(map(halve, [2, 4, 6])),
               oneTwoThree)
  t.same(processIterable(map(halve, new Set([2, 4, 6]))),
               oneTwoThree)
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

test('range', t => {
  const rangeFromThree = range(3)
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(range(1)(1)),
               [1])
  t.same(processIterable(range(1, 3)),
               oneTwoThree)
  t.same(processIterable(rangeFromThree(1)),
               threeTwoOne)
  t.same(processIterable(rangeFromThree(1)),
               threeTwoOne)
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

test('slice', t => {
  const sliceFromZero = slice(0)
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(sliceFromZero(3)(oneTwoThreeFour)),
               oneTwoThree)
  t.same(processIterable(slice(1)(2)(oneTwoThree)),
               [2])
  t.same(processIterable(slice(1)(20)(oneTwoThree)),
               [2, 3])
  t.same(processIterable(slice(1)(1)(oneTwoThree)),
               [])
  t.same(processIterable(slice(20)(100)(oneTwoThree)),
               [])
  t.same(processIterable(slice(0)(3)(positiveIntegers)),
               [1, 2, 3])
  t.same(processIterable(slice(3)(6)(positiveIntegers)),
               [4, 5, 6])
  t.same(processIterable(slice(40)(45)(positiveIntegers)),
               [41, 42, 43, 44, 45])
  t.same(processIterable(sliceFromZero(3)(slice(0, Infinity, positiveIntegers))),
               oneTwoThree)
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

test('tail', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(tail([])),
               [])
  t.same(processIterable(takeEight(tail(positiveIntegers))),
               [2, 3, 4, 5, 6, 7, 8, 9])
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

test('zip', t => {
  const processIterable = isFrozenToArray(t)
  t.same(processIterable(zip(oneTwoThree)(threeTwoOne)).map(processIterable),
               [[1, 3], [2, 2], [3, 1]])
  t.same(processIterable(zip(oneTwoThreeFour)(threeTwoOne)).map(processIterable),
               [[1, 3], [2, 2], [3, 1]])
  t.same(processIterable(zip(threeTwoOne)(positiveIntegers)).map(processIterable),
               [[3, 1], [2, 2], [1, 3]])
  t.same(processIterable(takeThree(zip(positiveIntegers, positiveIntegers))).map(processIterable),
               [[1, 1], [2, 2], [3, 3]])
})

test('zipWith', t => {
  const processIterable = isFrozenToArray(t)
  const zipWithSubtract = zipWith(subtract)
  t.same(processIterable(zipWithSubtract(oneTwoThree)(threeTwoOne)),
               [-2, 0, 2])
  t.same(processIterable(zipWithSubtract(oneTwoThreeFour)(threeTwoOne)),
               [-2, 0, 2])
  t.same(processIterable(zipWithSubtract(threeTwoOne)(positiveIntegers)),
               [2, 0, -2])
  t.same(processIterable(takeThree(zipWith(add, positiveIntegers, positiveIntegers))),
               [2, 4, 6])
})
