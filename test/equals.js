const test = require('tape')
const { assoc, empty, equals, map, range } = require('../')
const { oneTwoThree, oneTwoThreeFour, positiveIntegers } = require('./_tools')

const nestedOneTwoThree = map(() => oneTwoThree, oneTwoThree)

test('equals', (t) => {
  t.false(equals(false, true), 'booleans')
  t.false(equals(true, false), 'booleans')
  t.false(equals([1], empty()))
  t.false(equals(oneTwoThree, empty()))
  t.false(equals(oneTwoThree, [1, 2]))
  t.false(equals(positiveIntegers, false), 'lazy iterable and non-iterable')
  t.false(equals(false, positiveIntegers), 'non-iterable and lazy iterable')
  t.false(
    equals(
      nestedOneTwoThree,
      map(() => oneTwoThreeFour, oneTwoThree),
    ),
  )
  t.false(equals([() => {}], [() => {}]))
  t.false(equals([1, [2, { a: 5, b: 6 }]], [1, [2, { a: 5 }]]))
  t.false(equals('string', 'stringy'))
  t.false(
    equals(positiveIntegers, assoc(2, 42, positiveIntegers), 'is not eager'),
  )
  t.false(equals(range(0, 10), range(0, 9)), 'lazy iterables')
  t.false(equals(range(0, 9), range(0, 8)), 'lazy iterables')

  t.true(equals(true, true), 'booleans')
  t.true(equals(false, false), 'booleans')
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
  t.true(equals([1, [2, { a: 5, b: 6 }]], [1, [2, { a: 5, b: 6 }]]))

  t.true(equals(nestedOneTwoThree, nestedOneTwoThree))
  t.true(equals(range(0, 9), range(0, 9)), 'lazy iterables')
  t.end()
})
