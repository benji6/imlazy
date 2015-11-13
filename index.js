const B = a => b => c => a(b(c))
const createIterable = generator => Object.freeze({[Symbol.iterator]: generator})
const generatorFromIterable = xs => function* () {yield* xs}
const iterableFromIterable = B(createIterable)(generatorFromIterable)

export const adjust = f => a => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i--) yield x; else yield f(x)
})

export const append = a => xs => createIterable(function* () {
  yield* xs
  yield a
})

export const assoc = a => b => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i--) yield x; else yield b
})

export const concat = xs => ys => createIterable(function* () {
  yield* xs
  yield* ys
})

export const drop = a => xs => createIterable(function* () {
  let i = a
  for (let x of xs) if (i-- <= 0) yield x
})

export const dropWhile = f => xs => createIterable(function* () {
  let yielding = false
  for (let x of xs) {
    if (!f(x)) yielding = true
    if (yielding) yield x
  }
})

export const every = f => xs => {
  for (let x of xs) if (!f(x)) return false
  return true
}

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
  for (let x of xs) if (!f(x)) return; else yield x
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
