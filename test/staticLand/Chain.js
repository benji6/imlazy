import test from 'ava'
import {chain, equals, of} from '../../'

const f = x => of(x + 'f')
const g = x => x + 'g'
const u = of('value')

test('Chain', t => {
  t.true(equals(chain(g, chain(f, u)), chain(x => chain(g, f(x)), u)), 'Associativity')
})
