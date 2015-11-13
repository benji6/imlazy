# imlazy

Laziness is next to Godliness

## What is this?

JS library, for dealing with iterables, iterators and generators.

Functional, declarative, immutable and lazy as you like.

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them as detailed below.

Iterables returned by imlazy are simpy of the form:

```javascript

const someIterable = Object.freeze({[Symbol.Iterator]: function* () {
  // do some stuff
}});

```

Therefore they are lazy and immutable.

If you want to turn them into arrays or feed them into a function etc then just spread them (don't spread anything infinite or circular!):

```javascript

const someArray = [...someIterable];
const someReturnedValue = someFunction(...someIterable);

```

All functions exposed by imlazy are curried and data-last which makes them ideal for partial application and functional programming.

## Why?

Because lazy and immutable! (And also very small!)

- Want to operate on infinite or cicrular data strutures? No problem!

- Want to compose multiple transformations without having to worry about the performance costs of traversing data structures multiple times? No problem!

- Scared of your data structures being mutated and having to deal with painful bugs caused by this? No problem!

## Examples

```javascript

import {filter, makeCircular, range, reduce, take} from 'imlazy';

// all functions are autocurried for partial application
const sum = reduce((val, acc) => val + acc, 0);
const isEven = x => x % 2 === 0;

const positiveIntegers = range(1, Infinity);
const positiveEvenIntegers = filter(isEven, positiveIntegers);
const twoFourSix = take(3, positiveEvenIntegers);
sum(twoFourSix); // => 12

// NB twoFourSix is an immutable lazy iterable
// convert to an array like this
[...twoFourSix]; // => [2, 4, 6]

const oneTwoThree = range(1, 3);
const circularOneTwoThree = makeCircular(oneTwoThree);
[...take(8, circularOneTwoThree)]; // => [1, 2, 3, 1, 2, 3, 1, 2]

```

## API

### create

- iterableFrom
- iterableOf
- iterate
- range
- repeat

### "transform" (mutation free)

- adjust
- append
- assoc
- concat
- filter
- flatten
- insert
- insertAll
- intersperse
- makeCircular
- map
- partition
- pop
- prepend
- reduce
- remove
- reverse
- slice
- splitEvery
- take
- takeWhile
- tail
- transpose
- zip
- zipWith

### query

- every
- find
- findIndex
- head
- length
- nth
- slice
- some
- sort

## Project Scope

At the moment the scope of this project is limited to manipulating iterables using the iterator protocols. It does not expose standard FP functions like curry, compose, identity, flip, tap etc. It also does not prescribe a notion of equality, so iterables cannot be treated as sets and functions like [includes](https://tc39.github.io/Array.prototype.includes/), [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has), or [contains](http://ramdajs.com/docs/#contains) cannot exist. This could change going forwards.

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
