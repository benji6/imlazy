# imlazy

[![npm version](https://badge.fury.io/js/imlazy.svg)](https://badge.fury.io/js/imlazy)
[![Build Status](https://travis-ci.org/benji6/imlazy.svg?branch=master)](https://travis-ci.org/benji6/imlazy)

###### Functional programming with lazy immutable iterables

## What is this?

JS library, for dealing with iterables, iterators and generators

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them

Iterables returned by imlazy are of the form:

```js
const someIterable = Object.freeze({[Symbol.iterator]: function* () {
  // do some stuff
}});

```

Therefore they are lazy and immutable

If you want to turn them into arrays or feed them into a function etc then just spread them (don't spread anything infinite or circular!):

```js
const someArray = [...someIterable];
const someReturnedValue = someFunction(...someIterable);
```

All functions exposed by imlazy are curried and data-last which makes them ideal for partial application and functional programming

## Installation

```bash
npm i -S imlazy
```

***N.B. imlazy is written in ES2015. It runs fine in node 6 but will not run in a non ES2015 environment***

## Getting Started

### Debugging

imlazy implements a custom `toString` method for the iterables it returns which is useful for debugging. Just invoke `String` on an iterable returned by one of imlazy's functions, for instance:

```js
String(range(1, 8)) // => (1 2 3 4 5 6 7 8)
String(range(1, Infinity)) // => (1 2 3 4 5 6 7 8 9 10...)
```

The custom `toString` method can handle infinite iterables (in which case it lists the first 10 elements followed by ellipsis), nested iterables and uses a LISP-like notation to differentiate iterables from arrays and other JS data structures

### Code Examples

```js
const {cycle, filter, range, reduce, sum, take} = require('imlazy')

// all functions are autocurried for partial application
const takeEight = take(8)
const isEven = x => x % 2 === 0

const positiveIntegers = range(1, Infinity) // => (1 2 3 4 5 6 7 8 9 10...)
const positiveEvenIntegers = filter(isEven, positiveIntegers) // => (2 4 6 8 10 12 14 16 18 20...)
const twoFourSix = take(3, positiveEvenIntegers) // => (2 4 6)
sum(twoFourSix) // => 12

// NB twoFourSix is an immutable lazy iterable
// convert to an array like this
[...twoFourSix] // => [2, 4, 6]

const oneTwoThree = range(1, 3) // => (1 2 3)
const circularOneTwoThree = cycle(oneTwoThree) // => (1 2 3 1 2 3 1 2 3 1...)
takeEight(circularOneTwoThree) // => (1 2 3 1 2 3 1 2)

const fibonacciGenerator = function* () {
  let [a, b] = [0, 1]
  while (true) yield ([a, b] = [b, a + b])[0]
}

takeEight(fibonacciGenerator()) // => (1 1 2 3 5 8 13 21)
```

## [Click Here for Documentation](http://benji6.github.io/imlazy/docs/)

## Interoperability

### Symbol.iterator

This library works with all native iterable types including the Generator, String, Array, TypedArray, Map and Set types

In fact anything that has a `Symbol.iterator` property can be processed by this library and that includes custom data structures like iterables from [immutable-js](https://github.com/facebook/immutable-js)

### Static Land

<a href="https://github.com/rpominov/static-land"><img width="131" height="82" src="https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png" /></a>

This library implements the following [Static Land](https://github.com/rpominov/static-land) algebraic types:
- `Functor`
  - `Apply`
    - `Applicative`
    - `Chain`
      - `Monad`
- `Foldable`
- `Semigroup`
  - `Monoid`
- `Setoid`

## Performance

There is a benchmark in the root of this repo comparing imlazy with Ramda and native array methods. The `infiniteIterable` benchmarks map, filter and take over an infinite iterable and the `array` benchmarks map and filter over an array

These are the results on my machine when using node v7.4.0:

```bash
infiniteIterable - imlazy x 113 ops/sec ±0.20% (80 runs sampled)
infiniteIterable - ramdaTransducer x 555 ops/sec ±0.93% (91 runs sampled)
array - imlazy x 1,263 ops/sec ±1.01% (91 runs sampled)
array - ramdaTransducer x 20,968 ops/sec ±1.10% (93 runs sampled)
array - native x 3,764 ops/sec ±0.46% (95 runs sampled)
array - ramda x 29,460 ops/sec ±0.56% (94 runs sampled)
```

Ramda's transducers are significantly faster than imlazy over both infinite iterables and arrays

The [six-speed](https://github.com/kpdecker/six-speed) test results suggest that performance could be significantly improved in future iterations of the V8 engine

## Project Scope

The scope of this project is limited to manipulating iterables using the iteration protocols. It does not expose standard FP functions like curry, compose, identity, flip, tap etc

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
