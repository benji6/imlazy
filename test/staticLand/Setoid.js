const test = require('tape')
const { equals, of } = require('../../')

const a = of('foo')
const a_ = of('foo')
const a__ = of('foo')
const b = of('bar')

test('Setoid', (t) => {
  t.true(equals(a, a), 'Reflexivity')
  t.is(equals(a, a_), equals(a_, a), 'Symmetry')
  t.is(equals(a, b), equals(b, a), 'Symmetry')
  t.true(equals(a, a_), 'Symmetry')
  t.false(equals(a, b), 'Symmetry')
  t.true(equals(a, a_), 'Transitivity')
  t.true(equals(a_, a__), 'Transitivity')
  t.true(equals(a, a__), 'Transitivity')
  t.end()
})
