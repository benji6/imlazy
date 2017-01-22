import test from 'ava'
import {equals, map, of} from '../../'

const f = x => x + 'f'
const g = x => x + 'g'
const a = of('value')

test('Functor', t => {
  t.true(equals(map(x => x, a), a), 'Identity')
  t.true(equals(map(x => f(g(x)), a), map(f, map(g, a))), 'Composition')
})
