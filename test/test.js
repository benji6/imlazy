const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  double,
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
const reverse = src.reverse
const some = src.some
const sort = src.sort
const splitEvery = src.splitEvery
const takeWhile = src.takeWhile
const transpose = src.transpose
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1])

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(processIterable(append(4, immutableOneTwoThree)),
               oneTwoThreeFour)
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
