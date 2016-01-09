const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  double,
  fiveFiveFive,
  infiniteIterableOfPositiveIntegers,
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
const map = src.map
const partition = src.partition
const prepend = src.prepend
const remove = src.remove
const repeat = src.repeat
const reverse = src.reverse
const some = src.some
const sort = src.sort
const splitEvery = src.splitEvery
const takeWhile = src.takeWhile
const transpose = src.transpose
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1])
const isEven = x => x % 2 === 0

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(processIterable(append(4, immutableOneTwoThree)),
               oneTwoThreeFour)
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
