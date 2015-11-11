const B = a => b => c => a(b(c));
const createIterable = generator => Object.freeze({[Symbol.iterator]: generator});
const generatorFromIterable = iterable => function* () {
  yield* iterable;
};
const iterableFromIterable = B(createIterable)(generatorFromIterable);

export const adjust = f => a => iterable => createIterable(function* () {
  let i = a;
  for (let x of iterable) if (i--) yield x; else yield f(x);
});

export const append = a => iterable => createIterable(function* () {
  yield* iterable;
  yield a;
});

export const concat = iterableA => iterableB => createIterable(function* () {
  yield* iterableA;
  yield* iterableB;
});

export const drop = a => iterable => createIterable(function* () {
  let i = a;
  for (let x of iterable) if (i-- <= 0) yield x;
});

export const dropWhile = f => iterable => createIterable(function* () {
  let yielding = false;
  for (let x of iterable) {
    if (!f(x)) yielding = true;
    if (yielding) yield x;
  }
});

export const every = f => iterable => {
  for (let x of iterable) if (!f(x)) return false;
  return true;
};

export const filter = f => iterable => createIterable(function* () {
  for (let x of iterable) if (f(x)) yield x;
});

export const find = f => iterable => {
  for (let x of iterable) if (f(x)) return x;
};

export const findIndex = f => iterable => {
  let i = 0;
  for (let x of iterable) if (f(x)) return i; else i++;
};

export const flatten = iterables => createIterable(function* () {
  for (let xs of iterables) yield* xs;
});

export const head = iterable => iterable[Symbol.iterator]().next().value;

export const insert = a => b => iterable => createIterable(function* () {
  let i = a;
  for (let x of iterable) if (i--) yield x; else {
    yield b;
    yield x;
  }
});

export const insertAll = a => xs => ys => createIterable(function* () {
  let i = a;
  for (let y of ys) if (i--) yield y; else {
    yield* xs;
    yield y;
  }
});

export const intersperse = a => xs => createIterable(function* () {
  for (let x of xs) {
    yield x;
    yield a;
  }
});

export const iterableFrom = iterableFromIterable;
export const iterableOf = (...iterable) => iterableFromIterable(iterable);

export const iterate = f => a => createIterable(function* () {
  let x = a;
  yield x;
  while (true) yield x = f(x);
});

export const last = iterable => [...iterable].pop();
export const length = iterable => [...iterable].length;

export const makeCircular = iterable => createIterable(function* () {
  while (true) yield* iterable;
});

export const map = f => iterable => createIterable(function* () {
  for (let x of iterable) yield f(x);
});

export const nth = a => iterable => {
  let i = a;
  for (let x of iterable) if (i-- <= 0) return x;
};

export const partition = f => xs => createIterable(function* () {
  const listA = [];
  const listB = [];
  for (let x of xs) {
    if (f(x)) listA.push(x); else listB.push(x);
  }
  yield iterableFromIterable(listA);
  yield iterableFromIterable(listB);
});

export const pop = iterable => createIterable(function* () {
  const iterator = iterable[Symbol.iterator]();
  let next = iterator.next();
  while (true) {
    const {done, value} = next;
    next = iterator.next();
    if (next.done) return;
    yield value;
  }
});

export const prepend = a => iterable => createIterable(function* () {
  yield a;
  yield* iterable;
});

export const range = a => b => createIterable(function* (n = a) {
  if (n < b) while (n <= b) yield n++; else while (n >= b) yield n--;
});

export const repeat = a => b => createIterable(function* (x = b) {
  while (x--) yield a;
});

export const reduce = f => initialVal => iterable => {
  let acc = initialVal;
  for (let x of iterable) acc = f(acc)(x);
  return acc;
};

export const reverse = iterable => iterableFromIterable([...iterable].reverse());

export const slice = a => b => iterable => createIterable(function* (x = a, y = b) {
  const iterator = iterable[Symbol.iterator]();
  while (x--) if (iterator.next().done) return;
  while (--y) yield iterator.next().value;
});

export const some = f => iterable => {
  for (let x of iterable) if (f(x)) return true;
  return false;
};

export const sort = f => iterable => iterableFromIterable([...iterable].sort((a, b) => f(a)(b)));

export const tail = iterable => createIterable(function* () {
  let i = 1;
  for (let x of iterable) if (i) i--; else yield x;
});

export const take = a => iterable => createIterable(function* () {
  let i = a;
  for (let x of iterable) if (!i--) return; else yield x;
});

export const takeWhile = f => iterable => createIterable(function* () {
  for (let x of iterable) if (!f(x)) return; else yield x;
});

export const transpose = iterables => createIterable(function* () {
  const done = () => null;
  const _nth = (a, iterable) => {
    for (let x of iterable) if (a-- <= 0) return x;
    return done;
  };
  for (let i = 0; ; i++) {
    const returnGenerator = function* () {
      let j = 0;
      for (let iterable of iterables) {
        const value = _nth(i, iterable);
        if (value !== done) yield value;
      }
    };
    if (returnGenerator().next().done) return;
    yield createIterable(returnGenerator);
  }
});

export const zip = iterableA => iterableB => {
  const iteratorB = iterableB[Symbol.iterator]();
  return createIterable(function* () {
    for (let x of iterableA) {
      let {done, value} = iteratorB.next();
      if (done) return; else yield iterableFromIterable([x, value]);
    }
  });
};

export const zipWith = f => iterableA => iterableB => {
  const iteratorB = iterableB[Symbol.iterator]();
  return createIterable(function* () {
    for (let x of iterableA) {
      let {done, value} = iteratorB.next();
      if (done) return; else yield f(x)(value);
    }
  });
};
