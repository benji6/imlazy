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

## Why?

```javascript

import {filter, range, reduce, take} from 'imlazy';

// all functions are autocurried for partial application
const sum = reduce((val, acc) => val + acc, 0);

const positiveIntegers = range(1, Infinity);
const positiveEvenIntegers = filter(x => x % 2 === 0, positiveIntegers);
const twoFourSix = take(3, positiveEvenIntegers);
sum(twoFourSix); // => 12

```

## API

### create

- iterableFrom
- iterableOf
- range
- repeat

### "transform" (mutation free)

- append
- concat
- filter
- flatten
- makeCircular
- map
- pop
- prepend
- reduce
- reverse
- slice
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
