const test = require('tape')
const { chain, equals, of } = require('../../')

const f = (x) => of(x + 'f')
const a = 'value'
const u = of('value')

test('Monad', (t) => {
  t.true(equals(chain(f, of(a)), f(a)), 'Left identity')
  t.true(equals(chain(of, u), u), 'Right identity')
  t.end()
})
