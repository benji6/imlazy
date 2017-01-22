import test from 'ava'
import {reduce} from '../../'
import {oneTwoThree} from '../_tools'

const sum = (a, b) => a + b

test('Foldable', t => {
  t.is(
    reduce(sum, 0, oneTwoThree),
    ((f, x, u) => reduce((acc, y) => acc.concat([y]), [], u).reduce(f, x))(sum, 0, oneTwoThree)
  )
  t.is(reduce(sum, 0, oneTwoThree), 6)
  t.is(((f, x, u) => reduce((acc, y) => acc.concat([y]), [], u).reduce(f, x))(sum, 0, oneTwoThree), 6)
})
