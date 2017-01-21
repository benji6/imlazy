'use strict'

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
  return function * () {
    let i = 0
    while (true) {
      if (i >= cache.length) {
        const {done, value} = iterator.next()
        if (done) return; else cache.push(value)
      }
      yield cache[i++]
    }
  }
}

const iterToIter = xs => genToIter(function * () { yield * xs })

const sym = Symbol()

/**
 * Returns a new iterable with the given function applied to the value at the given index
 * @param {Function} f
 * @param {Number} index
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * adjust(x => 10 * x, 1, range(1, Infinity)) // => (1 20 3 4 5 6 7 8 9 10...)
 */
module.exports.adjust = curry((f, a, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) yield i-- ? x : f(x)
}))

/**
 * Applies an iterable of functions to an iterable of values
 * @param {Iterable} fs
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * ap(of(x => x * 2, x => x + 3), oneTwoThree) // => (2 4 6 4 5 6)
 */
module.exports.ap = curry((fs, xs) => genToIter(function * () {
  for (const f of fs) for (const x of xs) yield f(x)
}))

/**
 * Returns a new iterable of the given iterable followed by the given value
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * append(4, [1, 2, 3]) // => (1 2 3 4)
 */
module.exports.append = curry((a, xs) => genToIter(function * () {
  yield * xs
  yield a
}))

/**
 * Returns a new iterable identical to the supplied iterable except with the value at the given index replaced by the given value
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * assoc(2, 42, range(1, Infinity)) // => (1 2 42 4 5 6 7 8 9 10...)
 */
module.exports.assoc = curry((a, b, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) yield i-- ? x : b
}))

/**
 * Returns a new iterable of the first given iterable followed by the second given iterable
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * concat([100, 200], range(1, Infinity)) // => (100 200 1 2 3 4 5 6 7 8...)
 */
module.exports.concat = curry((xs, ys) => genToIter(function * () {
  yield * xs
  yield * ys
}))

/**
 * Returns a new iterable of the given iterable without the first n elements
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * drop(2, range(1, Infinity)) // => (3 4 5 6 7 8 9 10 11 12...)
 */
module.exports.drop = curry((n, xs) => {
  const iterator = xs[Symbol.iterator]()
  while (n--) iterator.next()
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * () { yield * generatorFactory() })
})

/**
 * Returns a new iterable by applying the given function to each value in the given iterable only yielding values when false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @return {Iterable}
 * @example empty() // => ()
 */
module.exports.empty = () => genToIter(function * () {})

/**
 * Applies the given function to each value in the given iterable until that function returns falsy, in which case false is returned. If the iterable is completely traversed and falsy is never returned by the given function then true is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
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
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @see reject
 * @example
 * filter(x => x % 2 === 0, range(1, Infinity)) // => (2 4 6 8 10 12 14 16 18 20...)
 */
module.exports.filter = curry((f, xs) => genToIter(function * () {
  for (const x of xs) if (f(x)) yield x
}))

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then find returns the value from the iterable and if the end of the iterable is reached with truthy never returned then find returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * find(x => x % 2 === 0, range(1, Infinity)) // => 2
 * find(x => x === 0, [1, 2, 3, 4, 5, 6]) // => undefined
 */
module.exports.find = curry((f, xs) => {
  for (const x of xs) if (f(x)) return x
})

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then findIndex returns the index from the iterable and if the end of the iterable is reached with truthy never returned then findIndex returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Iterable} xs
 * @return {Iterable}
 * @example flatten([1, [2, [3, [[4]]]], [range(1, Infinity)]) // => (1 2 4 4 1 2 3 4 5 6...)
 */
module.exports.flatten = xs => genToIter(function * recur (ys = xs) {
  for (const y of ys) if (isIterable(y)) yield * recur(y); else yield y
})

/**
 * Returns the first value from an iterable
 * @param {Iterable} xs
 * @return {Any}
 * @example head(range(1, Infinity)) // => 1
 * @see init
 * @see last
 * @see tail
 */
module.exports.head = xs => xs[Symbol.iterator]().next().value

/**
 * Returns a new iterable of all but the last element of the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example init(range(1, 5)) // => (1 2 3 4)
 * @see head
 * @see last
 * @see tail
 */
module.exports.init = xs => genToIter(function * () {
  let last = sym
  for (const x of xs) {
    if (last !== sym) yield last
    last = x
  }
})
/**
 * Returns a new iterable with the given value inserted at the given index in the given iterable
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Number} index
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
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
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Iterable} xs
 * @return Boolean
 * @example
 * isEmpty([]) // => true
 * isEmpty([0]) // => false
 */
module.exports.isEmpty = xs => xs[Symbol.iterator]().next().done

/**
 * Returns a new iterable with values identical to the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example interableFrom([1, 2, 3]) // => (1 2 3)
 */
module.exports.iterableFrom = iterToIter

/**
 * Returns an infinite iterable with the first value as the given initial value and all other values defined by applying the given function to the previous value
 * @param {f} function
 * @param {Any} initialValue
 * @return {Iterable}
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
 * @param {Iterable} xs
 * @return {Any}
 * @example last([1, 2, 3]) // => 3
 * @see head
 * @see init
 * @see tail
 */
module.exports.last = xs => [...xs].pop()

/**
 * Returns the number of elements in the given iterable
 * @param {Iterable} xs
 * @return {Number}
 * @example length(range(1, 100)) // => 100
 */
module.exports.length = xs => [...xs].length

/**
 * Maps a function over an iterable and concatenates the results
 * @param {Iterable} xs
 * @return {Iterable}
 * @example chain(x => of(x, x), oneTwoThree) // => (1 1 2 2 3 3)
 */
module.exports.chain = curry((f, xs) => genToIter(function * () {
  for (const x of xs) yield * f(x)
}))

/**
 * Returns a new iterable by infinitely repeating the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example cycle([1, 2, 3]) // => (1 2 3 1 2 3 1 2 3 1...)
 */
module.exports.cycle = xs => genToIter(function * () {
  while (true) yield * xs
})

/**
 * Returns a new Iterable by applying the given function to every value in the given iterable
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * map(x => 2 * x, range(1, Infinity)) // => (2 4 6 8 10 12 14 16 18 20...)
 */
module.exports.map = curry((f, xs) => genToIter(function * () {
  for (const x of xs) yield f(x)
}))

/**
 * Returns the value at the given index in the given iterable, or undefined if no value exists
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * nth(90, range(1, Infinity)) // => 90
 */
module.exports.nth = curry((a, xs) => {
  let i = a
  for (const x of xs) if (i-- <= 0) return x
})

/**
 * Returns an iterable of the arguments passed
 * @param {Any} ...values
 * @return {Iterable}
 * @example [...interableOf(1, 2, 3)] // => [1, 2, 3]
 */
module.exports.of = (...xs) => iterToIter(xs)

/**
 * Returns an iterable of two iterables, the first iterable contains every value from the given iterable where the given function returns truthy and the second iterable contains every value from the given iterable where the given function returns falsy
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * prepend(42, range(1, Infinity)) // => (42 1 2 3 4 5 6 7 8 9...)
 */
module.exports.prepend = curry((a, xs) => genToIter(function * () {
  yield a
  yield * xs
}))

/**
 * Returns a new iterable starting with the first given value and either descending or ascending in integer steps until the yielded value is equal to the second given value
 * @param {Number} startFrom
 * @param {Number} endAt
 * @return {Iterable}
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
 * @param {f} function
 * @param {Any} initialValue
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Function} f
 * @param {Iterable} xs
 * @see filter
 * @return {Iterable}
 * @example
 * reject(x => x % 2 === 0, range(1, Infinity)) // => (1 3 5 7 9 11 13 15 17 19...)
 */
module.exports.reject = curry((f, xs) => genToIter(function * () {
  for (const x of xs) if (!f(x)) yield x
}))

/**
 * Returns an iterable of the given iterable, excluding values from the given index for the given count
 * @param {Number} index
 * @param {Number} count
 * @param {Iterable} xs
 * @return {Iterable}
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
 * Returns a new iterable where every value is the given value and there are as many values as the given count
 * @param {Number} value
 * @param {Number} count
 * @return {Iterable}
 * @example
 * const repeat42 = repeat(42)
 * repeat42(3)) // => (42 42 42)
 * repeat42(Infinity)) // => (42 42 42 42 42 42 42 42 42 42...)
 */
module.exports.repeat = a => genToIter(function * () {
  while (true) yield a
})

/**
 * Returns a new iterable which is the reverse of the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example reverse([1, 2, 3]) // => (3 2 1)
 */
module.exports.reverse = xs => iterToIter([...xs].reverse())

/**
 * Returns an iterable of the given iterable starting at the given startIndex and ending one before the given endIndex
 * @param {Number} startIndex
 * @param {Number} endIndex
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * slice(2, 4, range(1, Infinity)) // => (3 4)
 */
module.exports.slice = curry((a, b, xs) => {
  const iterator = xs[Symbol.iterator]()
  let i = a
  while (i--) iterator.next()
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * () {
    let j = b - a
    for (const x of generatorFactory()) if (--j < 0) return; else yield x
  })
})

/**
 * Applies the given function to each value in the given iterable until that function returns truthy, in which case true is returned. If the iterable is completely traversed and truthy is never returned by the given function then false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
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
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * sort((a, b) => a - b, [5, 7, 3, 2]) // => (2 3 5 7)
 */
module.exports.sort = curry((f, xs) => iterToIter([...xs].sort(f)))

/**
 * Returns a new iterable of the given iterable sorted by the return value of the given function when applied to each value
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
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
 * @param {Number} length
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * const splitEveryTwo = splitEvery(2)
 * splitEveryTwo([1, 2, 3, 4, 5]) // => ((1 2) (3 4) (5))
 * splitEveryTwo(range(1, Infinity)) // => ((1 2) (3 4) (5 6) (7 8) (9 10) (11 12) (13 14) (15 16) (17 18) (19 20)...)
 */
module.exports.splitEvery = curry((a, xs) => genToIter(function * () {
  let i = 0
  while (true) {
    let yieldVal = module.exports.slice(i * a, (i + 1) * a, xs)
    if (module.exports.length(yieldVal)) yield yieldVal; else return
    i++
  }
}))

/**
 * Returns the sum of every element in the supplied iterable
 * @param {Iterable} xs
 * @return {Number}
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
 * @param {Iterable} xs
 * @return {Iterable}
 * @example tail(range(1, Infinity)) // => (2 3 4 5 6 7 8 9 10 11...)
 * @see head
 * @see init
 * @see last
 */
module.exports.tail = xs => {
  const iterator = xs[Symbol.iterator]()
  iterator.next()
  const generatorFactory = iterToGenFactory(iterator)
  return genToIter(function * () { yield * generatorFactory() })
}

/**
 * Returns an iterable of the first n elements of the given iterable
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * take(3, range(1, Infinity)) // => (1 2 3)
 */
module.exports.take = curry((a, xs) => genToIter(function * () {
  let i = a
  for (const x of xs) if (!i--) return; else yield x
}))

/**
 * Returns an iterable of the all elements of the given iterable until the given function returns falsy when called on the value of that element
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * takeWhile(x => x < 5, range(1, Infinity)) // => (1 2 3 4)
 */
module.exports.takeWhile = curry((f, xs) => genToIter(function * () {
  for (const x of xs) if (f(x)) yield x; else return
}))

/**
 * Returns a new iterable which is a transposition of the given iterable (columns and rows swapped)
 * @param {Iterable} xs
 * @return {Iterable}
 * @example transpose([
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
      let value = _nth(i, xs)
      if (value !== done) yield value
    }
  }
  for (let i = 0; ; i++) {
    let returnGenerator = createReturnGenerator(i)
    if (returnGenerator().next().done) return
    yield genToIter(returnGenerator)
  }
})

/**
 * Returns a new iterable with values as iterables of length 2 with the first element as the corresponding element from the first given iterable and the second element as the corresponding element from the second given iterable. The length of the returned iterable is the same as the shortest iterable supplied
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example zip(
 *   [2, 3, 5, 7],
 *   range(1, Infinity)
 * ) // => ((2 1) (3 2) (5 3) (7 4))
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
 * @param {Function} f
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * zipWith(
 *   (a, b) => a + b
 *   [2, 3, 5, 7],
 *   range(1, Infinity)
 * ) // => (3 5 8 11)
 */
module.exports.zipWith = curry((f, xs, ys) => genToIter(function * () {
  const iteratorY = ys[Symbol.iterator]()
  for (const x of xs) {
    const {done, value} = iteratorY.next()
    if (done) return; else yield f(x, value)
  }
}))
