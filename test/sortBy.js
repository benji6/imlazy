import test from 'ava'
import {sortBy} from '../'
import {isFrozenToArray} from './_tools'

test('sort', t => {
  const processIterable = isFrozenToArray(t)
  t.same(
    processIterable(sortBy(a => a[0])([[7, 2], [0, 1], [7, 5], [3, 8]])),
    [[0, 1], [3, 8], [7, 2], [7, 5]]
  )
  t.same(
    processIterable(sortBy(x => x.value, [{value: 7}, {value: 0}, {value: 7}, {value: 3}])),
    [{value: 0}, {value: 3}, {value: 7}, {value: 7}]
  )
})
