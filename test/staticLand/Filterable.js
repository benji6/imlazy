const test = require('tape')
const { equals, filter, range } = require('../../')

const a = range(0, 15)
const b = range(16, 17)
const f = x => Boolean(x % 2)
const g = x => Boolean(x % 3)

test('Filterable', t => {
  t.true(
    equals(
      filter(x => f(x) && g(x), a),
      filter(g, filter(f, a)),
    ),
    'Distributivity',
  )
  t.true(
    equals(
      filter(() => true, a),
      a,
    ),
    'Identity',
  )
  t.true(
    equals(
      filter(() => false, a),
      filter(() => false, b),
    ),
    'Annihilation',
  )
  t.end()
})
