'use strict'
const B = a => b => c => a(b(c))
const createIterable = generator => Object.freeze({[Symbol.iterator]: generator})
const generatorFromIterable = xs => function * () { yield* xs }
const iterableFromIterable = B(createIterable)(generatorFromIterable)
const isIterable = a => Boolean(a[Symbol.iterator])
const iteratorToGeneratorFactory = iterator => {
  const cache = []
  return function * () {
    var i = 0
    while (true) {
      if (i >= cache.length) {
        const next = iterator.next()
        if (next.done) return; else cache.push(next.value)
      }
      yield cache[i++]
    }
  }
}
const curry = f => {
  return function () {
    const xs = [].slice.call(arguments)
    return xs.length < f.length
      ? curry(f.bind.apply(f, [null].concat(xs)))
      : f.apply(undefined, xs)
  }
}

/**
 * Returns a new iterable with the given function applied to the value at the given index
 * @param {Function} f
 * @param {Number} index
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * adjust(x => 10 * x, 1, range(1, Infinity)) // => iterableOf(1, 20, 3, 4, 5, 6, 7, 8, ...)
 */
module.exports.adjust = curry((f, a, xs) => createIterable(function * () {
  var i = a
  for (var x of xs) if (i--) yield x; else yield f(x)
}))

/**
 * Returns a new iterable of the given iterable followed by the given value
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * append(4,
 *        [1, 2, 3]) // => iterableOf(1, 2, 3, 4)
 */
module.exports.append = curry((a, xs) => createIterable(function * () {
  yield* xs
  yield a
}))

/**
 * Returns a new iterable identical to the supplied iterable except with the value at the given index replaced by the given value
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * assoc(2, 42, range(1, Infinity)) // => iterableOf(1, 2, 42, 4, 5, 6, 7, 8, ...)
 */
module.exports.assoc = curry((a, b, xs) => createIterable(function * () {
  var i = a
  for (var x of xs) if (i--) yield x; else yield b
}))

/**
 * Returns a new iterable of the first given iterable followed by the second given iterable
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * concat([100, 200],
 *        range(1, Infinity)) // => iterableOf(100, 200, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
module.exports.concat = curry((xs, ys) => createIterable(function * () {
  yield* xs
  yield* ys
}))

/**
 * Returns a new iterable of the given iterable without the first n elements
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * drop(2, range(1, Infinity)) // => iterableOf(3, 4, 5, 6, 7, 8, 9, 10, ...)
 */
module.exports.drop = curry((n, xs) => {
  const iterator = xs[Symbol.iterator]()
  while (n--) iterator.next()
  const generatorFactory = iteratorToGeneratorFactory(iterator)
  return createIterable(function * () { yield * generatorFactory() })
})

/**
 * Returns a new iterable by applying the given function to each value in the given iterable only yielding values when false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * dropWhile(x => x <= 2, [1, 2, 3, 4, 3, 2, 1]) // => iterableOf(3, 4, 3, 2, 1)
 */
module.exports.dropWhile = curry((f, xs) => {
  const iteratorA = xs[Symbol.iterator]()
  const iteratorB = xs[Symbol.iterator]()
  var i = 0
  while (true) {
    const next = iteratorA.next()
    if (next.done || !f(next.value)) break
    i++
  }
  while (i--) iteratorB.next()
  const generatorFactory = iteratorToGeneratorFactory(iteratorB)
  return createIterable(function * () { yield * generatorFactory() })
})

/**
 * Applies the given function to each value in the given iterable until that function returns falsy, in which case false is returned. If the iterable is completely traversed and falsy is never returned by the given function then true is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
 * @example
 * every(x => x <= 20,
 *       [1, 2, 3, 4]) // => true
 * every(x => x <= 2,
 *       [1, 2, 3, 4]) // => false
 */
module.exports.every = curry((f, xs) => {
  for (var x of xs) if (!f(x)) return false
  return true
})

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns truthy
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @see reject
 * @example
 * filter(x => x % 2 === 0,
 *        range(1, Infinity)) // => iterableOf(2, 4, 6, 8, 10, 12, 14, 16, ...)
 */
module.exports.filter = curry((f, xs) => createIterable(function * () {
  for (var x of xs) if (f(x)) yield x
}))

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then find returns the value from the iterable and if the end of the iterable is reached with truthy never returned then find returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * find(x => x % 2 === 0,
 *      range(1, Infinity)) // => 2
 * find(x => x === 0,
 *      [1, 2, 3, 4, 5, 6]) // => undefined
 */
module.exports.find = curry((f, xs) => {
  for (var x of xs) if (f(x)) return x
})

/**
 * Applies the given function to each value in the given iterable. If truthy is returned then findIndex returns the index from the iterable and if the end of the iterable is reached with truthy never returned then findIndex returns undefined
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * findIndex(x => x % 2 === 0,
 *           range(1, Infinity) // => 1
 * findIndex(x => x === 0,
 *           [1, 2, 3]) // => undefined
 */
module.exports.findIndex = curry((f, xs) => {
  var i = 0
  for (var x of xs) if (f(x)) return i; else i++
})

/**
 * Takes an iterable and recursively unnests any values which are iterables
 * @param {Iterable} xs
 * @return {Iterable}
 * @example flatten([1, [2, [3, [[4]]]], [range(1, Infinity)]) // => iterableOf(1, 2, 4, 4, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
module.exports.flatten = xs => createIterable(function * recur (ys) {
  if (!arguments.length) ys = xs
  for (var y of ys) if (isIterable(y)) yield* recur(y); else yield y
})

/**
 * Returns the first value from an iterable
 * @param {Iterable} xs
 * @return {Any}
 * @example head(range(1, Infinity)) // => 1
 */
module.exports.head = xs => xs[Symbol.iterator]().next().value

/**
 * Returns a new iterable with the given value inserted at the given index in the given iterable
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * insert(1,
 *        42,
 *        range(1, Infinity)) // => iterableOf(1, 42, 2, 3, 4, 5, 6, 7, 8, ...)
 */
module.exports.insert = curry((a, b, xs) => createIterable(function * () {
  var i = a
  for (var x of xs) if (i--) yield x; else {
    yield b
    yield x
  }
}))

/**
 * Returns a new iterable with the values in the first given iterable inserted at the given index in the last given iterable
 * @param {Number} index
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * insertAll(1,
 *           [42, 24, 3],
 *           [1, 2, 3]) // => iterableOf(1, 42, 24, 3, 2, 3)
 */
module.exports.insertAll = curry((a, xs, ys) => createIterable(function * () {
  var i = a
  for (var y of ys) if (i--) yield y; else {
    yield* xs
    yield y
  }
}))

/**
 * Returns a new iterable with the given value interspersed at every other index in the given iterable
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * intersperse(42,
 *             range(1, Infinity)) // => iterableOf(1, 42, 2, 42, 3, 42, 4, 42, ...)
 */
module.exports.intersperse = curry((a, xs) => createIterable(function * () {
  for (var x of xs) {
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
 * @example interableFrom([1, 2, 3]) // => iterableOf(1, 2, 3)
 */
module.exports.iterableFrom = iterableFromIterable

/**
 * Returns an iterable of the arguments passed
 * @param {Any} ...values
 * @return {Iterable}
 * @example [...interableOf(1, 2, 3)] // => [1, 2, 3]
 */
module.exports.iterableOf = function () {
  return iterableFromIterable([].slice.call(arguments))
}

/**
 * Returns an infinite iterable with the first value as the given initial value and all other values defined by applying the given function to the previous value
 * @param {f} function
 * @param {Any} initialValue
 * @return {Iterable}
 * @example
 * iterate(x => 2 * x,
 *         1) // => iterableOf(1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, ...)
 */
module.exports.iterate = curry((f, a) => createIterable(function * () {
  var x = a
  yield x
  while (true) yield x = f(x)
}))

/**
 * Returns the last value in the given iterable
 * @param {Iterable} xs
 * @return {Any}
 * @example last([1, 2, 3]) // => 3
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
 * Returns a new iterable by infinitely repeating the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example makeCircular([1, 2, 3]) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2, 3, ...)
 */
module.exports.makeCircular = xs => createIterable(function * () {
  while (true) yield* xs
})

/**
 * Returns a new Iterable by applying the given function to every value in the given iterable
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * map(x => 2 * x,
 *     range(1, Infinity)) // => iterableOf(2, 4, 6, 8, 10, 12, 14, 16, 18, ...)
 */
module.exports.map = curry((f, xs) => createIterable(function * () {
  for (var x of xs) yield f(x)
}))

/**
 * Returns the value at the given index in the given iterable, or undefined if no value exists
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * nth(90,
 *     range(1, Infinity)) // => 90
 */
module.exports.nth = curry((a, xs) => {
  var i = a
  for (var x of xs) if (i-- <= 0) return x
})

/**
 * Returns an iterable of two iterables, the first iterable contains every value from the given iterable where the given function returns truthy and the second iterable contains every value from the given iterable where the given function returns falsy
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * partition(x => x % 2 === 0,
 *           [1, 2, 3, 4]) // => iterableOf(iterableOf(2, 4), iterableOf(1, 3))
*/
module.exports.partition = curry((f, xs) => createIterable(function * () {
  const listA = []
  const listB = []
  for (var x of xs) {
    if (f(x)) listA.push(x); else listB.push(x)
  }
  yield iterableFromIterable(listA)
  yield iterableFromIterable(listB)
}))

/**
 * Returns a new iterable with the given value prepended to the given iterable
 * @param {Any} value
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * prepend(42,
 *         range(1, Infinity)) // => iterableOf(42, 1, 2, 3, 4, 5, 6, 7, 8, ...)
 */
module.exports.prepend = curry((a, xs) => createIterable(function * () {
  yield a
  yield* xs
}))

/**
 * Returns a new iterable starting with the first given value and either descending or ascending in integer steps until the yielded value is equal to the second given value
 * @param {Number} startFrom
 * @param {Number} endAt
 * @return {Iterable}
 * @example
 * range(1, 3)) // => iterableOf(1, 2, 3)
 * range(1, Infinity)) // => iterableOf(1, 2, 3, 4, 5, 6, 7, 8, ...)
 * range(-1, -Infinity)) // => iterableOf(-1, -2, -3, -4, -5, -6, -7, -8, ...)
 */
module.exports.range = curry((a, b) => createIterable(function * () {
  var n = a
  if (n < b) while (n <= b) yield n++; else while (n >= b) yield n--
}))

/**
 * Returns a value by applying the given function with the accumulated value (starting with the given initialValue) and the current value for every value in the given iterable. The value returned from each call to the given function becomes the accumulated value for the next time it is called
 * @param {f} function
 * @param {Any} initialValue
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * reduce((acc, val) => acc + val,
 *        0,
 *        [1, 2, 3, 4]) // => 10
 */
module.exports.reduce = curry((f, a, xs) => {
  var acc = a
  for (var x of xs) acc = f(acc, x)
  return acc
})

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns falsy
 * @param {Function} f
 * @param {Iterable} xs
 * @see filter
 * @return {Iterable}
 * @example
 * reject(x => x % 2 === 0,
 *        range(1, Infinity)) // => iterableOf(1, 3, 5, 7, 9, 11, 13, 15, ...)
 */
module.exports.reject = curry((f, xs) => createIterable(function * () {
  for (var x of xs) if (!f(x)) yield x
}))

/**
 * Returns an iterable of the given iterable, excluding values from the given index for the given count
 * @param {Number} index
 * @param {Number} count
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * remove(2,
 *        4,
 *        range(1, Infinity)) // => iterableOf(1, 2, 7, 8, 9, 10, 11, 12, ...)
 */
module.exports.remove = curry((a, b, xs) => createIterable(function * () {
  var i = a
  var j = b
  var yielding = true
  for (var x of xs) {
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
 * repeat42(3)) // => iterableOf(42, 42, 42)
 * repeat42(Infinity)) // => iterableOf(42, 42, 42, 42, 42, 42, 42, 42, 42...)
 */
module.exports.repeat = a => createIterable(function * () {
  while (true) yield a
})

/**
 * Returns a new iterable which is the reverse of the given iterable
 * @param {Iterable} xs
 * @return {Iterable}
 * @example reverse([1, 2, 3]) // => iterableOf(3, 2, 1)
 */
module.exports.reverse = xs => iterableFromIterable([...xs].reverse())

/**
 * Returns an iterable of the given iterable starting at the given startIndex and ending one before the given endIndex
 * @param {Number} startIndex
 * @param {Number} endIndex
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * slice(2,
 *       4,
 *       range(1, Infinity)) // => iterableOf(3, 4)
 */
module.exports.slice = curry((a, b, xs) => {
  const iterator = xs[Symbol.iterator]()
  var i = a
  while (i--) iterator.next()
  const generatorFactory = iteratorToGeneratorFactory(iterator)
  return createIterable(function * () {
    var j = b - a
    for (var x of generatorFactory()) if (--j < 0) return; else yield x
  })
})

/**
 * Applies the given function to each value in the given iterable until that function returns truthy, in which case true is returned. If the iterable is completely traversed and truthy is never returned by the given function then false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
 * @example
 * some(x => x === 20,
 *      [1, 2, 3, 4]) // => false
 * some(x => x === 2,
 *      [1, 2, 3, 4]) // => true
 */
module.exports.some = curry((f, xs) => {
  for (var x of xs) if (f(x)) return true
  return false
})

/**
 * Returns a new iterable of the given iterable sorted based on the return value of the given function when called with any two values from the given iterable
 * @param {f} function
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * sort((a, b) => a - b,
 *      [5, 7, 3, 2]) // => iterableOf(2, 3, 5, 7)
 */
module.exports.sort = curry((f, xs) => iterableFromIterable([...xs].sort(f)))

/**
 * Returns a new iterable comprised by iterables created from the given iterable of length specified by the given length
 * @param {Number} length
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * const splitEveryThree = splitEvery(3)
 * splitEveryThree([1, 2, 3, 4]) // => iterableOf(iterableOf(1, 2, 3), iterableOf(4))
 * splitEveryThree(range(1, Infinity)) // => iterableOf(iterableOf(1, 2, 3), iterableOf(4, 5, 6), iterableOf(7, 8, 9), ...)
 */
module.exports.splitEvery = curry((a, xs) => createIterable(function * () {
  var i = 0
  while (true) {
    var yieldVal = module.exports.slice(i * a, (i + 1) * a, xs)
    if (module.exports.length(yieldVal)) yield yieldVal; else return
    i++
  }
}))

/**
 * Returns the sum of every element in the supplied iterable
 * @param {Iterable} xs
 * @return {Number}
 * @example
 * sum(iterableOf(1, 2, 3)) // => 6
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
 * @example tail(range(1, Infinity)) // => iterableOf(2, 3, 4, 5, 6, 7, 8, 9, ...)
 */
module.exports.tail = xs => {
  const iterator = xs[Symbol.iterator]()
  iterator.next()
  const generatorFactory = iteratorToGeneratorFactory(iterator)
  return createIterable(function * () { yield * generatorFactory() })
}

/**
 * Returns an iterable of the first n elements of the given iterable
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * take(3,
 *      range(1, Infinity)) // => iterableOf(1, 2, 3)
 */
module.exports.take = curry((a, xs) => createIterable(function * () {
  var i = a
  for (var x of xs) if (!i--) return; else yield x
}))

/**
 * Returns an iterable of the all elements of the given iterable until the given function returns falsy when called on the value of that element
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * takeWhile(x => x < 5,
 *           range(1, Infinity)) // => iterableOf(1, 2, 3, 4)
 */
module.exports.takeWhile = curry((f, xs) => createIterable(function * () {
  for (var x of xs) if (f(x)) yield x; else return
}))

/**
 * Returns a new iterable which is a transposition of the given iterable (columns and rows swapped)
 * @param {Iterable} xs
 * @return {Iterable}
 * @example transpose([[1, 2, 3],
 *                     [4, 5, 6],
 *                     [7, 8, 9]]) // => iterableOf(iterableOf(1, 4, 7),
 *                                 //               iterableOf(2, 5, 8),
 *                                 //               iterableOf(3, 6, 9))
 */
module.exports.transpose = xss => createIterable(function * () {
  const done = () => null
  const _nth = (a, xs) => {
    for (var x of xs) if (a-- <= 0) return x
    return done
  }
  const createReturnGenerator = i => function * () {
    for (var xs of xss) {
      var value = _nth(i, xs)
      if (value !== done) yield value
    }
  }
  for (var i = 0; ; i++) {
    var returnGenerator = createReturnGenerator(i)
    if (returnGenerator().next().done) return
    yield createIterable(returnGenerator)
  }
})

/**
 * Returns a new iterable with values as iterables of length 2 with the first element as the corresponding element from the first given iterable and the second element as the corresponding element from the second given iterable. The length of the returned iterable is the same as the shortest iterable supplied
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * zip([2, 3, 5, 7], range(1, Infinity)) // => iterableOf(
 *                                       //      iterableOf(2, 1),
 *                                       //      iterableOf(3, 2),
 *                                       //      iterableOf(5, 3),
 *                                       //      iterableOf(7, 4)
 *                                       //    )
 */
module.exports.zip = curry((xs, ys) => {
  return createIterable(function * () {
    const iteratorB = ys[Symbol.iterator]()
    for (const x of xs) {
      var next = iteratorB.next()
      var done = next.done
      var value = next.value
      if (done) return; else yield iterableFromIterable([x, value])
    }
  })
})

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
 * ) // => iterableOf(3, 5, 8, 11)
 */
module.exports.zipWith = curry((f, xs, ys) => {
  return createIterable(function * () {
    const iteratorB = ys[Symbol.iterator]()
    for (const x of xs) {
      const next = iteratorB.next()
      const done = next.done
      const value = next.value
      if (done) return; else yield f(x, value)
    }
  })
})
