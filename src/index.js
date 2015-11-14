const B = a => b => c => a(b(c))
const createIterable = generator => Object.freeze({[Symbol.iterator]: generator})
const generatorFromIterable = xs => function* () {yield* xs}
const iterableFromIterable = B(createIterable)(generatorFromIterable)

/**
 * Returns a new iterable with the given function applied to the value at the given index
 * @param {Function} f
 * @param {Number} index
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * adjust(x => 2 * x,
 *        1,
 *        [1, 2, 3]); // => iterableOf(1, 4, 3)
 */
export const adjust = f => a => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i--) yield x; else yield f(x)
})

/**
 * Returns a new iterable of the given iterable followed by the given value
 * @param {Any} value
 * @param {Iterable} iterable
 * @return {Iterable}
 * @example
 * append(4,
 *        [1, 2, 3]); // => iterableOf(1, 2, 3, 4)
 */
export const append = a => xs => createIterable(function* () {
  yield* xs
  yield a
})

/**
 * Returns a new iterable with the given value at the given index
 * @param {Number} index
 * @param {Any} value
 * @param {Iterable} iterable
 * @return {Iterable}
 * @example
 * assoc(1,
 *       5,
 *       [1, 2, 3]); // => iterableOf(1, 5, 3)
 */
export const assoc = a => b => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i--) yield x; else yield b
})

/**
 * Returns a new iterable of the first given iterable followed by the second given iterable
 * @param {Iterable} xs
 * @param {Iterable} ys
 * @return {Iterable}
 * @example
 * concat([1, 2],
 *        [3, 4]); // => iterableOf(1, 2, 3, 4)
 */
export const concat = xs => ys => createIterable(function* () {
  yield* xs
  yield* ys
})

/**
 * Returns a new iterable of the given iterable without the first n elements
 * @param {Number} n
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * drop(2,
 *      [1, 2, 3, 4]); // => iterableOf(3, 4)
 */
export const drop = n => xs => createIterable(function* () {
  let i = n
  for (let x of xs) if (i-- <= 0) yield x
})

/**
 * Returns a new iterable by applying the given function to each value in the given iterable only yielding values when false is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * dropWhile(x => x <= 2,
 *           [1, 2, 3, 4, 3, 2, 1]); // => iterableOf(3, 4, 3, 2, 1)
 */
export const dropWhile = f => xs => createIterable(function* () {
  let yielding = false
  for (let x of xs) {
    if (!f(x)) yielding = true
    if (yielding) yield x
  }
})

/**
 * Applies the given function to each value in the given iterable until that function returns falsy, in which case false is returned. If the iterable is completely traversed and falsy is never returned by the given function then true is returned
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Boolean}
 * @example
 * every(x => x <= 20,
 *       [1, 2, 3, 4]); // => true
 * every(x => x <= 2,
 *       [1, 2, 3, 4]); // => false
 */
export const every = f => xs => {
  for (let x of xs) if (!f(x)) return false
  return true
}

/**
 * Returns a new iterable containing only values from the given iterable where the given function applied to that value returns truthy
 * @param {Function} f
 * @param {Iterable} xs
 * @return {Iterable}
 * @example
 * filter(x => x % 2 === 0,
 *       [1, 2, 3, 4, 5, 6]); // => iterableOf(2, 4, 6)
 */
export const filter = f => xs => createIterable(function* () {
  for (let x of xs) if (f(x)) yield x
})

export const find = f => xs => {
  for (let x of xs) if (f(x)) return x
}

export const findIndex = f => xs => {
  let i = 0
  for (let x of xs) if (f(x)) return i; else i++
}

export const flatten = xss => createIterable(function* () {
  for (let xs of xss) yield* xs
})

export const head = xs => xs[Symbol.iterator]().next().value

export const insert = a => b => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i--) yield x; else {
    yield b
    yield x
  }
})

export const insertAll = a => xs => ys => createIterable(function* () {
  let i = a
  for (let y of ys) if (i--) yield y; else {
    yield* xs
    yield y
  }
})

export const intersperse = a => xs => createIterable(function* () {
  for (let x of xs) {
    yield x
    yield a
  }
})

export const iterableFrom = iterableFromIterable
export const iterableOf = (...xs) => iterableFromIterable(xs)

export const iterate = f => a => createIterable(function* () {
  let x = a
  yield x
  while (true) yield x = f(x)
})

export const last = xs => [...xs].pop()
export const length = xs => [...xs].length

export const makeCircular = xs => createIterable(function* () {
  while (true) yield* xs
})

export const map = f => xs => createIterable(function* () {
  for (let x of xs) yield f(x)
})

export const nth = a => xs => {
  let i = a
  for (let x of xs) if (i-- <= 0) return x
}

export const partition = f => xs => createIterable(function* () {
  const listA = []
  const listB = []
  for (let x of xs) {
    if (f(x)) listA.push(x); else listB.push(x)
  }
  yield iterableFromIterable(listA)
  yield iterableFromIterable(listB)
})

export const pop = xs => createIterable(function* () {
  const iterator = xs[Symbol.iterator]()
  let next = iterator.next()
  while (true) {
    const {done, value} = next
    next = iterator.next()
    if (next.done) return
    yield value
  }
})

export const prepend = a => xs => createIterable(function* () {
  yield a
  yield* xs
})

export const range = a => b => createIterable(function* () {
  let n = a
  if (n < b) while (n <= b) yield n++; else while (n >= b) yield n--
})

export const reduce = f => a => xs => {
  let acc = a
  for (let x of xs) acc = f(acc)(x)
  return acc
}

export const remove = a => b => xs => createIterable(function* () {
  let i = a
  let j = b
  let yielding = true
  for (let x of xs) {
    if (!i--) yielding = false
    if (yielding) yield x; else if (!--j) yielding = true
  }
})

export const repeat = a => b => createIterable(function* () {
  let x = b
  while (x--) yield a
})

export const reverse = xs => iterableFromIterable([...xs].reverse())

export const slice = a => b => xs => createIterable(function* () {
  let i = a
  let j = b
  for (let x of xs) {
    if (--j < 0) return
    if (--i < 0) yield x
  }
})

export const some = f => xs => {
  for (let x of xs) if (f(x)) return true
  return false
}

export const sort = f => xs => iterableFromIterable([...xs].sort((a, b) => f(a)(b)))

export const splitEvery = a => xs => createIterable(function* () {
  let i = 0
  while (true) {
    const yieldVal = slice(i * a)((i + 1) * a)(xs)
    if (length(yieldVal)) yield yieldVal; else return
    i++
  }
})

export const tail = xs => createIterable(function* () {
  let i = 1
  for (let x of xs) if (i) i--; else yield x
})

export const take = a => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (!i--) return; else yield x
})

export const takeWhile = f => xs => createIterable(function* () {
  for (let x of xs) if (f(x)) yield x; else return
})

export const transpose = xss => createIterable(function* () {
  const done = () => null
  const _nth = (a, xs) => {
    for (let x of xs) if (a-- <= 0) return x
    return done
  }
  for (let i = 0; ; i++) {
    const returnGenerator = function* () {
      let j = 0
      for (let xs of xss) {
        const value = _nth(i, xs)
        if (value !== done) yield value
      }
    }
    if (returnGenerator().next().done) return
    yield createIterable(returnGenerator)
  }
})

export const zip = xs => ys => {
  const iteratorB = ys[Symbol.iterator]()
  return createIterable(function* () {
    for (let x of xs) {
      let {done, value} = iteratorB.next()
      if (done) return; else yield iterableFromIterable([x, value])
    }
  })
}

export const zipWith = f => xs => ys => {
  const iteratorB = ys[Symbol.iterator]()
  return createIterable(function* () {
    for (let x of xs) {
      let {done, value} = iteratorB.next()
      if (done) return; else yield f(x)(value)
    }
  })
}
