const test = require('tape')
const {ap, equals, of} = require('../../')

const f = x => x + 'f'
const x = 'foo'
const u = of(f)
const v = of(x)

test('Applicative', t => {
  t.true(equals(ap(of(x => x), v), v), 'Identity')
  t.true(equals(ap(of(f), of(x)), of(f(x))), 'Homomorphism')
  t.true(equals(ap(u, of(x)), ap(of(f => f(x)), u)), 'Interchange')
  t.end()
})
