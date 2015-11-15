# imlazy

Laziness is next to Godliness

## What is this?

JS library, for dealing with iterables, iterators and generators.

Functional, declarative, immutable and lazy as you like.

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them.

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

import {filter, makeCircular, range, reduce, take} from 'imlazy'

// all functions are autocurried for partial application
const sum = reduce((val, acc) => val + acc, 0)
const takeEight = take(8);
const isEven = x => x % 2 === 0

const positiveIntegers = range(1, Infinity) // => iterableOf(1, 2, 3, 4, 5, 6, 7, 8, ...)
const positiveEvenIntegers = filter(isEven, positiveIntegers) // => iterableOf(2, 4, 6, 8, ...)
const twoFourSix = take(3, positiveEvenIntegers) // => iterableOf(2, 4, 6)
sum(twoFourSix) // => 12

// NB twoFourSix is an immutable lazy iterable
// convert to an array like this
[...twoFourSix] // => [2, 4, 6]

const oneTwoThree = range(1, 3) // => iterableOf(1, 2, 3)
const circularOneTwoThree = makeCircular(oneTwoThree) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2, 3, ...)
takeEight(circularOneTwoThree) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2)

const fibonacciGenerator = function* () {
  let [a, b] = [0, 1]
  while (true) yield ([a, b] = [b, a + b])[0]
}

takeEight(fibonacciGenerator()) // => iterableOf(1, 1, 2, 3, 5, 8, 13, 21)

```

## [Click Here for Documentation](http://benji6.github.io/imlazy/docs/)

## Project Scope

At the moment the scope of this project is limited to manipulating iterables using the iteration protocols. It does not expose standard FP functions like curry, compose, identity, flip, tap etc. It also does not prescribe a notion of equality, so iterables cannot be treated as sets and functions like [includes](https://tc39.github.io/Array.prototype.includes/), [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has), or [contains](http://ramdajs.com/docs/#contains) cannot exist. This could change going forwards.

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
