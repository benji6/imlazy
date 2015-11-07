const callWithIterator = f => iterable => f(iterable[Symbol.iterator]());
const createIterable = generator => ({[Symbol.iterator]: generator});

export const range = a => b => createIterable(function* (n = a) {
  if (n < b) while (n <= b) yield n++;
  else while (n >= b) yield n--;
});

export const filter = f => iterable => createIterable(function* () {
  for (let val of iterable) if (f(val)) yield val;
});

export const map = f => iterable => createIterable(function* () {
  for (let val of iterable[Symbol.iterator]()) yield f(val);
});

export const take = a => callWithIterator(iterator => createIterable(function* (n = a) {
  while (n--) yield iterator.next().value;
}));

export const nth = n => callWithIterator(iterator => {
  while (n--) iterator.next();
  return iterator.next().value;
});

export const find = f => callWithIterator(iterator => {
  do {
    let {value, done} = iterator.next();
    if (done) return;
    if (f(value)) return value;
  } while (true)
});

export const makeCircular = iterable => createIterable(function* () {
  while (true) yield* iterable[Symbol.iterator]();
});
