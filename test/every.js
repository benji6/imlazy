import test from 'ava'
import {every} from '../'
import {fiveFiveFive} from './_tools'

test('every', t => {
  t.same(every(x => x === 5)(fiveFiveFive), true)
  t.same(every(x => x === 30, fiveFiveFive), false)
})
