const Immutable = require('immutable')
const test = require('ava')
const src = require('../')
import {
  isFrozenToArray,
  oneTwoThreeFour
} from './_tools'

const append = src.append

test('immutable interop', t => {
  const processIterable = isFrozenToArray(t)
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3)
  t.same(processIterable(append(4, immutableOneTwoThree)),
               oneTwoThreeFour)
})
