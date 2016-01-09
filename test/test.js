const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  infiniteIterableOfPositiveIntegers,
  isFrozenToArray,
  negativeIntegers,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  takeEight,
  takeThree
} from './_tools'

const append = src.append
const takeWhile = src.takeWhile
const transpose = src.transpose

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(processIterable(append(4, immutableOneTwoThree)),
               oneTwoThreeFour)
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
