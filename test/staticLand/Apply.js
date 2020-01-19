const test = require('tape')
const { ap, equals, map, of } = require('../../')

const a = of(x => x.length)
const u = of(x => x + 'bar')
const v = of('value')

test('Apply', t => {
  t.true(
    equals(
      ap(
        ap(
          map(f => g => x => f(g(x)), a),
          u,
        ),
        v,
      ),
      ap(a, ap(u, v)),
    ),
    'Composition',
  )
  t.end()
})
