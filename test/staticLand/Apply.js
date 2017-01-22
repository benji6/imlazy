import test from 'ava'
import {ap, equals, map, of} from '../../'

const a = of(x => x.length)
const u = of(x => x + 'bar')
const v = of('value')

test('Apply', t => {
  t.true(equals(
    ap(ap(map(f => g => x => f(g(x)), a), u), v),
    ap(a, ap(u, v))
  ), 'Composition')
})
