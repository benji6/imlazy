const B = a => b => c => a(b(c));
const createIterable = generator => Object.freeze({[Symbol.iterator]: generator});
const generatorFromIterable = iterable => function* () {
  yield* iterable;
};
const iterableFromIterable = B(createIterable)(generatorFromIterable);

export const concat = iterableA => iterableB => createIterable(function* () {
  yield* iterableA;
  yield* iterableB;
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

export const flatten = iterable => createIterable(function* () {
  for (let xs of iterable) yield* xs;
});

export const iterableFrom = iterableFromIterable;

export const iterableOf = (...iterable) => iterableFromIterable(iterable);

export const length = iterable => [...iterable].length;

export const makeCircular = iterable => createIterable(function* () {
  while (true) yield* iterable;
});

export const map = f => iterable => createIterable(function* () {
  for (let val of iterable[Symbol.iterator]()) yield f(val);
});

export const nth = a => iterable => {
  let i = a;
  for (let x of iterable) if (--i) return x;
};

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

export const take = a => iterable => createIterable(function* () {
  let i = a;
  for (let x of iterable) if (!i--) return; else yield x;
});

export const takeWhile = f => iterable => createIterable(function* () {
  for (let x of iterable) if (!f(x)) return; else yield x;
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
