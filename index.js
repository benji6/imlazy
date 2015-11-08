const callWithIterator = f => iterable => f(iterable[Symbol.iterator]());
const createIterable = generator => ({[Symbol.iterator]: generator});

export const concat = iterableA => iterableB => createIterable(function* () {
  yield* iterableA;
  yield* iterableB;
});

export const every = f => callWithIterator(iterator => {
  while (true) {
    let {value, done} = iterator.next();
    if (done) return true;
    if (!f(value)) return false;
  }
});

export const filter = f => iterable => createIterable(function* () {
  for (let val of iterable) if (f(val)) yield val;
});

export const find = f => callWithIterator(iterator => {
  while (true) {
    let {value, done} = iterator.next();
    if (done) return;
    if (f(value)) return value;
  }
});

export const findIndex = f => callWithIterator(iterator => {
  let i = 0;
  while (true) {
    let {value, done} = iterator.next();
    if (done) return;
    if (f(value)) return i;
    i++;
  }
});

export const length = callWithIterator(iterator => {
  let i = 0;
  while (!iterator.next().done) i++;
  return i;
});

export const makeCircular = iterable => createIterable(function* () {
  while (true) yield* iterable;
});

export const map = f => iterable => createIterable(function* () {
  for (let val of iterable[Symbol.iterator]()) yield f(val);
});

export const nth = n => callWithIterator(iterator => {
  while (n--) iterator.next();
  return iterator.next().value;
});

export const range = a => b => createIterable(function* (n = a) {
  if (n < b) while (n <= b) yield n++;
  else while (n >= b) yield n--;
});

export const repeat = a => b => createIterable(function* (x = b) {
  while (x--) yield a;
});

export const reduce = f => acc => callWithIterator(iterator => {
  while (true) {
    let {value, done} = iterator.next();
    if (done) return acc;
    acc = f(acc)(value);
  }
});

export const reverse = iterable => createIterable(function* () {
  yield* [...iterable].reverse();
});

export const some = f => callWithIterator(iterator => {
  while (true) {
    let {value, done} = iterator.next();
    if (done) return false;
    if (f(value)) return true;
  }
});

export const take = a => callWithIterator(iterator => createIterable(function* (n = a) {
  while (n--) yield iterator.next().value;
}));

export const zip = iterableA => iterableB => {
  const iteratorA = iterableA[Symbol.iterator]();
  const iteratorB = iterableB[Symbol.iterator]();
  return createIterable(function* () {
    while (true) {
      let nextA = iteratorA.next();
      let nextB = iteratorB.next();
      if (nextA.done || nextB.done) return;
      yield createIterable(function* () {
        yield nextA.value;
        yield nextB.value;
      });
    }
  });
};
