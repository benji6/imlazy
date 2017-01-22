import test from 'ava'
import {chain, equals, of} from '../../'

const f = x => of(x + 'f')
const a = 'value'
const u = of('value')

test('Monad', t => {
  t.true(equals(chain(f, of(a)), f(a)), 'Left identity')
  t.true(equals(chain(of, u), u), 'Right identity')
})
