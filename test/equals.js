import test from 'ava'
import {empty, equals, map} from '../'
import {oneTwoThree, oneTwoThreeFour} from './_tools'

const nestedOneTwoThree = map(() => oneTwoThree, oneTwoThree)

test('equals', t => {
  t.false(equals([1], empty()))
  t.false(equals(oneTwoThree, empty()))
  t.false(equals(oneTwoThree, [1, 2]))
  t.false(equals(nestedOneTwoThree, map(() => oneTwoThreeFour, oneTwoThree)))
  t.false(equals([() => {}], [() => {}]))
  t.false(equals([1, [2, {a: 5, b: 6}]], [1, [2, {a: 5}]]))
  t.false(equals('string', 'stringy'))

  t.true(equals('string', 'string'))
  t.true(equals(empty(), empty()))
  t.true(equals(empty(), []))
  t.true(equals([], empty()))
  t.true(equals([], []))
  t.true(equals([[1, 2], 3], [[1, 2], 3]))
  t.true(equals(oneTwoThree, oneTwoThree))
  t.true(equals(oneTwoThree, [1, 2, 3]))
  t.true(equals([1, 2, 3], oneTwoThree))
  t.true(equals([1, 2, 3], [1, 2, 3]))
  t.true(equals([1, [2, {a: 5, b: 6}]], [1, [2, {a: 5, b: 6}]]))

  t.true(equals(nestedOneTwoThree, nestedOneTwoThree))
})
