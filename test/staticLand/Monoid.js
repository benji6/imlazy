import test from 'ava'
import {concat, empty, equals, of} from '../../'

const a = of('foo')

test('Monoid', t => {
  t.true(equals(concat(a, empty()), a), 'Right identity')
  t.true(equals(concat(empty(), a), a), 'Left identity')
})
