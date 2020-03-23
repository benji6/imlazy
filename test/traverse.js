const Task = require('fun-task')
const test = require('tape')
const imlazy = require('..')
const {
  curriedAdd,
  oneTwoThreeFour,
  oneTwoThree,
  testAndToArray,
} = require('./_tools')
const { empty, map, of, traverse } = imlazy

const mapAdd10 = map(curriedAdd(10))

test('traverse with imlazy', (t) => {
  const processIterable = testAndToArray(t)

  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, empty())).map(processIterable),
    [[]],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, of(empty(), oneTwoThreeFour))),
    [],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, of(of(1), of(2, 3, 4)))).map(
      processIterable,
    ),
    [
      [11, 12],
      [11, 13],
      [11, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, of(of(1, 2), of(3, 4)))).map(
      processIterable,
    ),
    [
      [11, 13],
      [11, 14],
      [12, 13],
      [12, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy)(mapAdd10, of(of(1, 2), of(3, 4)))).map(
      processIterable,
    ),
    [
      [11, 13],
      [11, 14],
      [12, 13],
      [12, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10)(of(of(1, 2), of(3, 4)))).map(
      processIterable,
    ),
    [
      [11, 13],
      [11, 14],
      [12, 13],
      [12, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy)(mapAdd10)(of(of(1, 2), of(3, 4)))).map(
      processIterable,
    ),
    [
      [11, 13],
      [11, 14],
      [12, 13],
      [12, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, of(oneTwoThree, of(4)))).map(
      processIterable,
    ),
    [
      [11, 14],
      [12, 14],
      [13, 14],
    ],
  )
  t.deepEqual(
    processIterable(traverse(imlazy, mapAdd10, [oneTwoThreeFour, []])),
    [],
  )

  t.end()
})

test('traverse with fun-task', (t) => {
  const processIterable = testAndToArray(t)

  traverse(Task, (a) => Task.of(String(a * 3)), oneTwoThree).run({
    success: (a) => {
      t.deepEqual(processIterable(a), ['3', '6', '9'])
      t.end()
    },
  })
})
