'use strict'

const isEqualWith = require('lodash.isequalwith')

const lastSymbol = Symbol()
const noValueSymbol = Symbol()

const curry = f => (...xs) => xs.length < f.length
  ? curry(f.bind(...[null, ...xs]))
  : f(...xs)

const toString = module.exports._toString = xs => function imlazyToStringThunk () {
  const tooLong = [...module.exports.take(11, xs)].length === 11
  return `(${module.exports.reduce(
    (str, x) => `${str}${String(x)} `,
    '',
    module.exports.take(10, xs)
  ).slice(0, -1)}${tooLong ? '...' : ''})`
}

const genToIter = gen => {
  const xs = {[Symbol.iterator]: gen}
  Object.defineProperty(xs, 'toString', {value: toString(xs)})
  return Object.freeze(xs)
}

const isIterable = a => Boolean(a[Symbol.iterator])

const iterToGenFactory = iterator => {
  const cache = []
  return function * (msg) {
    let i = 0
    while (true) {
      if (i >= cache.length) {
        const {done, value} = iterator.next(msg)
        if (done) return; else cache.push(value)
      }
      yield cache[i++]
    }
  }
}

const iterToIter = xs => genToIter(function * () { yield * xs })

const lazyIterable = (f, xs) => {
  let iterable
  if (xs.fs) {
    const fs = [...xs.fs, f]
    iterable = {
      fs,
      xs: xs.xs,
      * [Symbol.iterator] () {
        const gs = []; for (let i = 0; i < fs.length; i++) gs.push(fs[i]())
        const g = x => {
          let val = x
          for (let j = 0; j < gs.length; j++) {
            val = gs[j](val)
            if (val === noValueSymbol) return noValueSymbol
          }
          return val
        }
        const zs = xs.xs
        if (Array.isArray(zs)) {
          for (let i = 0; i < zs.length; i++) {
            const val = g(zs[i])
            if (val === noValueSymbol) continue
            yield val
          }
        } else {
          for (const x of zs) {
            const val = g(x)
            if (val === noValueSymbol) continue
            yield val
          }
        }
      },
    }
  } else {
    iterable = {
      fs: [f],
      xs,
      * [Symbol.iterator] () {
        const g = f()
        if (Array.isArray(xs)) {
          for (let i = 0; i < xs.length; i++) {
            const val = g(xs[i])
            if (val === noValueSymbol) continue
            yield val
          }
        } else {
          for (const x of xs) {
            const val = g(x)
            if (val === noValueSymbol) continue
            yield val
          }
        }
      },
    }
  }
  Object.defineProperty(iterable, 'toString', {value: toString(iterable)})
  return Object.freeze(iterable)
}

/**
 * Returns a new iterable with the given function applied to the value at the given index
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @example
 * adjust(x => 10 * x, 1, range(1, Infinity)) // => (1 20 3 4 5 6 7 8 9 10...)
 */
module.exports.adjust = curry((f, a, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) yield i-- ? x : f(x)
}))

/**
 * Applies an iterable of functions to an iterable of values
 * @sig [a → b] → [a] → [b]
 * @example
 * ap(of(x => x * 2, x => x + 3), oneTwoThree) // => (2 4 6 4 5 6)
 */
module.exports.ap = curry((fs, xs) => genToIter(function * () {
  for (const f of fs) for (const x of xs) yield f(x)
}))

/**
 * Returns a new iterable of the given iterable followed by the given value
 * @sig a -> [a] -> [a]
 * @example
 * append(4, [1, 2, 3]) // => (1 2 3 4)
 */
module.exports.append = curry((a, xs) => genToIter(function * () {
  yield * xs
  yield a
}))

/**
 * Returns a new iterable identical to the supplied iterable except with the value at the given index replaced by the given value
 * @sig Number -> a -> [a] -> [a]
 * @example
 * assoc(2, 42, range(1, Infinity)) // => (1 2 42 4 5 6 7 8 9 10...)
 */
module.exports.assoc = curry((a, b, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) yield i-- ? x : b
}))

/**
 * Returns a new iterable of the first given iterable followed by the second given iterable
 * @sig [a] -> [a] -> [a]
 * @example
 * concat([100, 200], range(1, Infinity)) // => (100 200 1 2 3 4 5 6 7 8...)
 */
module.exports.concat = curry((xs, ys) => genToIter(function * () {
  yield * xs
  yield * ys
}))

/**
 * Returns a new iterable of the given iterable without the first n elements
 * @sig Number -> [a] -> [a]
 * @example
 * drop(2, range(1, Infinity)) // => (3 4 5 6 7 8 9 10 11 12...)
 */
module.exports.drop = curry((n, xs) => {
  const iterator = xs[Symbol.iterator]()
  while (n--) iterator.next()
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * (msg) { yield * generatorFactory(msg) })
})

/**
 * Returns a new iterable by applying the given function to each value in the given iterable only yielding values when false is returned
 * @sig (a -> Boolean) -> [a] -> [a]
 * @example
 * dropWhile(x => x <= 2, [1, 2, 3, 4, 3, 2, 1]) // => (3 4 3 2 1)
 */
module.exports.dropWhile = curry((f, xs) => {
  const iteratorA = xs[Symbol.iterator]()
  const iteratorB = xs[Symbol.iterator]()
  let i = 0
  while (true) {
    const {done, value} = iteratorA.next()
    if (done || !f(value)) break
    i++
  }
  while (i--) iteratorB.next()
  const generatorFactory = iterToGenFactory(iteratorB)
  return genToIter(function * () { yield * generatorFactory() })
})

/**
 * Returns an empty iterable
 * @sig Any -> []
 * @example empty() // => ()
 */
module.exports.empty = () => genToIter(function * () {})

const shouldSpread = x => isIterable(x) && typeof x.length !== 'number'
const customizer = (x, y) => {
  const shouldSpreadX = shouldSpread(x)
  const shouldSpreadY = shouldSpread(y)
  if (shouldSpreadX || shouldSpreadY) {
    const xs = shouldSpreadX ? [...x] : x
    const ys = shouldSpreadY ? [...y] : y
    return module.exports.equals(xs, ys)
  }
}
/**
 * Returns `true` if arguments are equivalent and `false` otherwise. Equality of iterable values is determined element by element recursively and equality of non-iterable values is checked via `lodash.equals`
 * @sig a -> b -> Boolean
 * @example
 * equals(range(1, 3), range(1, 3)) // => true
 * equals(range(1, 3), [1, 2, 3]) // => true
 * equals([[1, 2], 3], [[1, 2], 3]) // => true
 * equals([1, [2, {a: 5, b: 6}]], [1, [2, {a: 5, b: 6}]]) // => true
 * equals([1, [2, {a: 5, b: 6}]], [1, [2, {a: 5}]]) // => false
 * equals(range(1, 3), [1, 2]) // => false
 */
module.exports.equals = curry((x, y) => isEqualWith(x, y, customizer))

/**
 * Applies the given function to each value in the given iterable until that function returns falsy, in which case false is returned. If the iterable is completely traversed and falsy is never returned by the given function then true is returned
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @example
 * every(x => x <= 20, [1, 2, 3, 4]) // => true
 * every(x => x <= 2, [1, 2, 3, 4]) // => false
 */
module.exports.every = curry((f, xs) => {
  for (const x of xs) if (!f(x)) return false
  return true
})

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns truthy
 * @see reject
 * @sig (a -> Boolean) -> [a] -> [a]
 * @example
 * filter(x => x % 2 === 0, range(1, Infinity)) // => (2 4 6 8 10 12 14 16 18 20...)
 */
module.exports.filter = curry((f, xs) => lazyIterable(
  () => x => f(x) ? x : noValueSymbol,
  xs
))

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then find returns the value from the iterable and if the end of the iterable is reached with truthy never returned then find returns undefined
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @example
 * find(x => x % 2 === 0, range(1, Infinity)) // => 2
 * find(x => x === 0, [1, 2, 3, 4, 5, 6]) // => undefined
 */
module.exports.find = curry((f, xs) => {
  for (const x of xs) if (f(x)) return x
})

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then findIndex returns the index from the iterable and if the end of the iterable is reached with truthy never returned then findIndex returns undefined
 * @sig (a -> Boolean) -> [a] -> Number
 * @example
 * findIndex(x => x % 2 === 0, range(1, Infinity) // => 1
 * findIndex(x => x === 0, [1, 2, 3]) // => undefined
 */
module.exports.findIndex = curry((f, xs) => {
  let i = 0
  for (const x of xs) if (f(x)) return i; else i++
})

/**
 * Takes an iterable and recursively unnests any values which are iterables
 * @sig [a] -> [b]
 * @example flatten([1, [2, [3, [[4]]]], [range(1, Infinity)]) // => (1 2 4 4 1 2 3 4 5 6...)
 */
module.exports.flatten = xs => genToIter(function * recur (ys = xs) {
  for (const y of ys) if (isIterable(y)) yield * recur(y); else yield y
})

/**
 * Returns the first value from an iterable
 * @example head(range(1, Infinity)) // => 1
 * @see init last tail
 * @sig [a] -> a | undefined
 */
module.exports.head = xs => xs[Symbol.iterator]().next().value

/**
 * Checks whether the supplied iterable contains the supplied value. Equality is checked using the `equals` function defined by this library
 * @sig a -> [a] -> Boolean
 * @example
 * includes(1, range(1, 5)) // => true
 * includes(10, range(1, 5)) // => false
 */
module.exports.includes = curry((y, xs) => {
  for (const x of xs) if (module.exports.equals(x, y)) return true
  return false
})

/**
 * Returns a new iterable of all but the last element of the given iterable
 * @example init(range(1, 5)) // => (1 2 3 4)
 * @see head last tail
 * @sig a -> [a] -> [a]
 */
module.exports.init = xs => genToIter(function * () {
  let last = lastSymbol
  for (const x of xs) {
    if (last !== lastSymbol) yield last
    last = x
  }
})

/**
 * Returns a new iterable with the given value inserted at the given index in the given iterable
 * @sig Number -> a -> [a] -> [a]
 * @example
 * insert(1, 42, range(1, Infinity)) // => (1 42 2 3 4 5 6 7 8 9...)
 */
module.exports.insert = curry((a, b, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) {
    if (i--) yield x; else {
      yield b
      yield x
    }
  }
}))

/**
 * Returns a new iterable with the values in the first given iterable inserted at the given index in the last given iterable
 * @sig Number -> [a] -> [a] -> [a]
 * @example
 * insertAll(1, [42, 24, 3], [1, 2, 3]) // => (1 42 24 3 2 3)
 */
module.exports.insertAll = curry((a, xs, ys) => genToIter(function * () {
  let i = a
  for (const y of ys) {
    if (i--) yield y; else {
      yield * xs
      yield y
    }
  }
}))

/**
 * Returns a new iterable with the given value interspersed at every other index in the given iterable
 * @sig a -> [a] -> [a]
 * @example
 * intersperse(42, range(1, Infinity)) // => (1 42 2 42 3 42 4 42 5 42...)
 */
module.exports.intersperse = curry((a, xs) => genToIter(function * () {
  for (const x of xs) {
    yield x
    yield a
  }
}))

/**
 * Returns true if the iterable has no values in it and false otherwise
 * @sig [a] -> Boolean
 * @example
 * isEmpty([]) // => true
 * isEmpty([0]) // => false
 */
module.exports.isEmpty = xs => xs[Symbol.iterator]().next().done

/**
 * Returns a new iterable with values identical to the given iterable
 * @sig [a] -> [a]
 * @example interableFrom([1, 2, 3]) // => (1 2 3)
 */
module.exports.iterableFrom = iterToIter

/**
 * Returns an infinite iterable with the first value as the given initial value and all other values defined by applying the given function to the previous value
 * @sig (a -> a) -> a -> [a]
 * @example
 * iterate(x => 2 * x, 1) // => (1 2 4 8 16 32 64 128 256 512...)
 */
module.exports.iterate = curry((f, a) => genToIter(function * () {
  let x = a
  yield x
  while (true) yield x = f(x)
}))

/**
 * Returns the last value in the given iterable
 * @example last([1, 2, 3]) // => 3
 * @sig [a] -> a | undefined
 * @see head init tail
 */
module.exports.last = xs => [...xs].pop()

/**
 * Returns the number of elements in the given iterable
 * @sig [a] -> Number
 * @example length(range(1, 100)) // => 100
 */
module.exports.length = xs => [...xs].length

/**
 * Maps a function over an iterable and concatenates the results
 * @sig (a -> [b]) -> [a] -> [b]
 * @example chain(x => of(x, x), oneTwoThree) // => (1 1 2 2 3 3)
 */
module.exports.chain = curry((f, xs) => genToIter(function * () {
  for (const x of xs) yield * f(x)
}))

/**
 * Returns a new iterable by infinitely repeating the given iterable
 * @sig [a] -> [a]
 * @example cycle([1, 2, 3]) // => (1 2 3 1 2 3 1 2 3 1...)
 */
module.exports.cycle = xs => module.exports.isEmpty(xs)
  ? module.exports.empty()
  : genToIter(function * () { while (true) yield * xs })

/**
 * Returns a new Iterable by applying the given function to every value in the given iterable
 * @sig (a -> b) -> [a] -> [b]
 * @example
 * map(x => 2 * x, range(1, Infinity)) // => (2 4 6 8 10 12 14 16 18 20...)
 */
module.exports.map = curry((f, xs) => lazyIterable(() => f, xs))

/**
 * Returns the value at the given index in the given iterable, or undefined if no value exists
 * @sig Number -> [a] -> a | undefined
 * @example
 * nth(90, range(1, Infinity)) // => 90
 */
module.exports.nth = curry((a, xs) => {
  let i = a
  for (const x of xs) if (i-- <= 0) return x
})

/**
 * Returns an iterable of the arguments passed
 * @sig a -> [a]
 * @example [...interableOf(1, 2, 3)] // => [1, 2, 3]
 */
module.exports.of = (...xs) => iterToIter(xs)

/**
 * Returns an iterable of two iterables, the first iterable contains every value from the given iterable where the given function returns truthy and the second iterable contains every value from the given iterable where the given function returns falsy
 * @sig (a -> Boolean) -> [a] -> [[a] [a]]
 * @example
 * partition(x => x % 2 === 0, [1, 2, 3, 4]) // => ((2 4) (1 3))
*/
module.exports.partition = curry((f, xs) => genToIter(function * () {
  const listA = []
  const listB = []
  for (const x of xs) (f(x) ? listA : listB).push(x)
  yield iterToIter(listA)
  yield iterToIter(listB)
}))

/**
 * Returns a new iterable with the given value prepended to the given iterable
 * @sig a -> [a] -> [a]
 * @example
 * prepend(42, range(1, Infinity)) // => (42 1 2 3 4 5 6 7 8 9...)
 */
module.exports.prepend = curry((a, xs) => genToIter(function * () {
  yield a
  yield * xs
}))

/**
 * Returns a new iterable starting with the first given value and either descending or ascending in integer steps until the yielded value is equal to the second given value
 * @sig Number -> Number -> [Number]
 * @example
 * range(1, 3)) // => (1 2 3)
 * range(1, Infinity)) // => (1 2 3 4 5 6 7 8 9 10...)
 * range(-1, -Infinity)) // => (-1 -2 -3 -4 -5 -6 -7 -8 -9 -10...)
 */
module.exports.range = curry((a, b) => genToIter(function * () {
  let n = a
  if (n < b) while (n <= b) yield n++; else while (n >= b) yield n--
}))

/**
 * Returns a value by applying the given function with the accumulated value (starting with the given initialValue) and the current value for every value in the given iterable. The value returned from each call to the given function becomes the accumulated value for the next time it is called
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @example
 * reduce((acc, val) => acc + val, 0, [1, 2, 3, 4]) // => 10
 */
module.exports.reduce = curry((f, a, xs) => {
  let acc = a
  for (const x of xs) acc = f(acc, x)
  return acc
})

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns falsy
 * @see filter
 * @sig (a -> Boolean) -> [a] -> [a]
 * @example
 * reject(x => x % 2 === 0, range(1, Infinity)) // => (1 3 5 7 9 11 13 15 17 19...)
 */
module.exports.reject = curry((f, xs) => lazyIterable(
  () => x => f(x) ? noValueSymbol : x,
  xs
))

/**
 * Returns an iterable of the given iterable, excluding values from the given index for the given count
 * @sig Number -> Number -> [a] -> [a]
 * @example
 * remove(2, 4, range(1, Infinity)) // => (1 2 7 8 9 10 11 12 13 14...)
 */
module.exports.remove = curry((a, b, xs) => genToIter(function * () {
  let i = a
  let j = b
  let yielding = true
  for (const x of xs) {
    if (!i--) yielding = false
    if (yielding) yield x; else if (!--j) yielding = true
  }
}))

/**
 * Returns an infinite iterable of the given value
 * @sig a -> [a]
 * @example
 * repeat(42) // => (42 42 42 42 42 42 42 42 42 42...)
 * take(3, repeat('hi')) // => ('hi' 'hi' 'hi')
 */
module.exports.repeat = a => genToIter(function * () {
  while (true) yield a
})

/**
 * Returns a new iterable which is the reverse of the given iterable
 * @sig [a] -> [a]
 * @example reverse([1, 2, 3]) // => (3 2 1)
 */
module.exports.reverse = xs => iterToIter([...xs].reverse())

/**
 * Returns an iterable of the given iterable starting at the given startIndex and ending one before the given endIndex
 * @sig Number -> Number -> [a] -> [a]
 * @example
 * slice(2, 4, range(1, Infinity)) // => (3 4)
 */
module.exports.slice = curry((n, m, xs) => {
  if (n >= m) return module.exports.empty()
  let iterator
  if (n > 0) {
    iterator = xs[Symbol.iterator](noValueSymbol)
    let i = n
    while (i--) iterator.next(noValueSymbol)
  } else {
    iterator = xs[Symbol.iterator]()
  }
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * (msg) {
    let j = m - n
    const iterator = generatorFactory(msg)
    while (j--) {
      const {done, value} = iterator.next(msg)
      if (done) return; yield value
    }
  })
})

/**
 * Applies the given function to each value in the given iterable until that function returns truthy, in which case true is returned. If the iterable is completely traversed and truthy is never returned by the given function then false is returned
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @example
 * some(x => x === 20, [1, 2, 3, 4]) // => false
 * some(x => x === 2, [1, 2, 3, 4]) // => true
 */
module.exports.some = curry((f, xs) => {
  for (const x of xs) if (f(x)) return true
  return false
})

/**
 * Returns a new iterable of the given iterable sorted based on the return value of the given function when called with any two values from the given iterable
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @example
 * sort((a, b) => a - b, [5, 7, 3, 2]) // => (2 3 5 7)
 */
module.exports.sort = curry((f, xs) => iterToIter([...xs].sort(f)))

/**
 * Returns a new iterable of the given iterable sorted by the return value of the given function when applied to each value
 * @sig (a -> b) -> [a] -> [a]
 * @example
 * sortBy(
 *   x => x.value,
 *   [{value: 7}, {value: 0}, {value: 7}, {value: 3}]
 * ) // => ({value: 0} {value: 3} {value: 7} {value: 7})
 */
module.exports.sortBy = curry((f, xs) =>
  iterToIter([...xs].sort((a, b) => {
    const c = f(a)
    const d = f(b)
    return c > d ? 1 : c < d ? -1 : 0
  })))

/**
 * Returns a new iterable comprised by iterables created from the given iterable of length specified by the given length
 * @sig Number -> [a] -> [[a]]
 * @example
 * const splitEveryTwo = splitEvery(2)
 * splitEveryTwo([1, 2, 3, 4, 5]) // => ((1 2) (3 4) (5))
 * splitEveryTwo(range(1, Infinity)) // => ((1 2) (3 4) (5 6) (7 8) (9 10) (11 12) (13 14) (15 16) (17 18) (19 20)...)
 */
module.exports.splitEvery = curry((a, xs) => genToIter(function * () {
  let i = 0
  while (true) {
    const yieldVal = module.exports.slice(i * a, (i + 1) * a, xs)
    if (module.exports.length(yieldVal)) yield yieldVal; else return
    i++
  }
}))

/**
 * Returns the sum of every element in the supplied iterable
 * @sig [Number] -> Number
 * @example
 * sum(of(1, 2, 3)) // => 6
 */
module.exports.sum = xs => {
  let total = 0
  for (const x of xs) total += x
  return total
}

/**
 * Returns a new iterable of all but the first element of the given iterable
 * @example tail(range(1, Infinity)) // => (2 3 4 5 6 7 8 9 10 11...)
 * @see head init last
 * @sig [a] -> [a]
 */
module.exports.tail = xs => {
  const iterator = xs[Symbol.iterator]()
  iterator.next()
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * () { yield * generatorFactory() })
}

/**
 * Returns an iterable of the first n elements of the given iterable
 * @sig Number -> [a] -> [a]
 * @example
 * take(3, range(1, Infinity)) // => (1 2 3)
 */
module.exports.take = curry((a, xs) => genToIter(function * () {
  let i = a
  const iterator = xs[Symbol.iterator]()
  while (i--) {
    const {done, value} = iterator.next()
    if (done) return; yield value
  }
}))

/**
 * Returns an iterable of the all elements of the given iterable until the given function returns falsy when called on the value of that element
 * @sig (a -> Boolean) -> [a] -> [a]
 * @example
 * takeWhile(x => x < 5, range(1, Infinity)) // => (1 2 3 4)
 */
module.exports.takeWhile = curry((f, xs) => genToIter(function * () {
  for (const x of xs) if (f(x)) yield x; else return
}))

/**
 * Returns a new iterable which is a transposition of the given iterable (columns and rows swapped)
 * @sig [[a]] -> [[a]]
 * @example
 * transpose([
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * ]) // => ((1 4 7) (2 5 8) (3 6 9))
 */
module.exports.transpose = xss => genToIter(function * () {
  const done = () => null
  const _nth = (a, xs) => {
    for (const x of xs) if (a-- <= 0) return x
    return done
  }
  const createReturnGenerator = i => function * () {
    for (const xs of xss) {
      const value = _nth(i, xs)
      if (value !== done) yield value
    }
  }
  for (let i = 0; ; i++) {
    const returnGenerator = createReturnGenerator(i)
    if (returnGenerator().next().done) return
    yield genToIter(returnGenerator)
  }
})

/**
 * Returns a new iterable with values as iterables of length 2 with the first element as the corresponding element from the first given iterable and the second element as the corresponding element from the second given iterable. The length of the returned iterable is the same as the shortest iterable supplied
 * @sig [a] -> [b] -> [[a b]]
 * @example zip([2, 3, 5, 7], range(1, Infinity)) // => ((2 1) (3 2) (5 3) (7 4))
 */
module.exports.zip = curry((xs, ys) => genToIter(function * () {
  const iteratorY = ys[Symbol.iterator]()
  for (const x of xs) {
    const {done, value} = iteratorY.next()
    if (done) return; else yield iterToIter([x, value])
  }
}))

/**
 * Returns a new iterable with values as the result of calling the given function with the corresponding element from the first and second given iterables respectively. The length of the returned iterable is the same as the shortest iterable supplied
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @example
 * zipWith((a, b) => a + b, [2, 3, 5, 7], range(1, Infinity)) // => (3 5 8 11)
 */
module.exports.zipWith = curry((f, xs, ys) => genToIter(function * () {
  const iteratorY = ys[Symbol.iterator]()
  for (const x of xs) {
    const {done, value} = iteratorY.next()
    if (done) return; else yield f(x, value)
  }
}))
