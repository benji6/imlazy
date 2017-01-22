import test from 'ava'
import {concat, equals, of} from '../../'

const a = of('foo')
const b = of('bar')
const c = of('baz')

test('Semigroup', t => {
  t.true(equals(concat(concat(a, b), c), concat(a, concat(b, c))), 'Associativity')
})
