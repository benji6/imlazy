# imlazy

[![npm version](https://badge.fury.io/js/imlazy.svg)](https://badge.fury.io/js/imlazy)
[![Build Status](https://travis-ci.org/benji6/imlazy.svg?branch=master)](https://travis-ci.org/benji6/imlazy)

###### Functional programming with lazy immutable iterables

## Introduction

imlazy let's you harness the power of the [ES2015 iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). With it you can create infinite or circular iterables which are lazy, immutable and performant. For instance:

```js
const {filter, range} = require('imlazy')

const isEven = x => x % 2 === 0

const positiveIntegers = range(1, Infinity) // => (1 2 3 4 5 6 7 8 9 10...)
const positiveEvenIntegers = filter(isEven, positiveIntegers) // => (2 4 6 8 10 12 14 16 18 20...)
```

All functions are auto-curried and iterable-last (like in [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) and [ramda](http://ramdajs.com/)) which allows developers to build up reusable functions with partial application like so:

```js
const {take} = require('imlazy')

const takeThree = take(3)

const oneTwoThree = takeThree(positiveIntegers) // => (1 2 3)
const twoFourSix = takeThree(positiveEvenIntegers) // => (2 4 6)
```

Putting iterables into an array, or set, or using them as arguments to a function call is simple (be careful with anything infinite or circular though!):

```js
[...twoFourSix] // => [2, 4, 6]
Array.from(twoFourSix) // => [2, 4, 6]
new Set(twoFourSix) // => Set { 2, 4, 6 }
Math.max(...twoFourSix) // => 6
```

Because imlazy uses the ES2015 iteration protocols it is compatible with all native iterables (including the `Generator`, `String`, `Array`, `TypedArray`, `Map` and `Set` types) and many libraries (including [Immutable.js](https://github.com/facebook/immutable-js)):

```js
const {sum} = require('imlazy')
const Immutable = require('immutable')

sum(twoFourSix) // => 12
sum([2, 4, 6]) // => 12
sum(new Set(twoFourSix)) // => 12
sum(Immutable.List.of(2, 4, 6)) // => 12

const fibonacciGenerator = function* () {
  let [a, b] = [0, 1]
  while (true) yield ([a, b] = [b, a + b])[0]
}

take(8, fibonacciGenerator()) // => (1 1 2 3 5 8 13 21)
```

All iterables created by imlazy are frozen with `Object.freeze` so, not only are they lazy, they're also immutable.

If you want to find out more about the ES2015 iteration protocols [this MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) is a good place to start.

## Getting Started

### Installation

```sh
npm i -S imlazy
```

### API Documentation

[API docs are here](https://imlazy.netlify.com).

### Support

imlazy is written in ES2015 and will run in any environment that supports that specification. If using in Node.js use version 6 or greater.

### Debugging

imlazy implements a custom `toString` method for the iterables it returns. Just invoke `String` on an iterable returned by one of imlazy's functions to see what's inside it:

```js
String(range(1, 8)) // => (1 2 3 4 5 6 7 8)
String(range(1, Infinity)) // => (1 2 3 4 5 6 7 8 9 10...)
```

The custom `toString` method can handle nested and infinite iterables (in which case it lists the first 10 elements followed by ellipsis) and uses a LISP-like notation to differentiate iterables from arrays and other JS data structures

## Static Land

<a href="https://github.com/rpominov/static-land"><img width="131" height="82" src="https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png" /></a>

This library implements the following [Static Land](https://github.com/rpominov/static-land) algebraic types:
- `Functor`
  - `Apply`
    - `Applicative`
    - `Chain`
      - `Monad`
- `Foldable`
  - `Traversable`
- `Filterable`
- `Semigroup`
  - `Monoid`
- `Setoid`

## Performance

There is a `benchmarks` dir in the root of this repo. Here are the results on my machine running node 8.9.3:

`benchmarks/filter.js`
```sh
imlazy - filter 1x over array x 16,682 ops/sec ±0.80% (88 runs sampled)
native - filter 1x over array x 66,412 ops/sec ±1.00% (87 runs sampled)
imlazy - filter 2x over array x 17,981 ops/sec ±0.94% (89 runs sampled)
native - filter 2x over array x 44,942 ops/sec ±1.81% (87 runs sampled)
imlazy - filter 3x over array x 20,923 ops/sec ±1.94% (84 runs sampled)
native - filter 3x over array x 42,275 ops/sec ±1.55% (91 runs sampled)
```

`benchmarks/map.js`
```sh
imlazy - map 1x over array x 9,939 ops/sec ±0.98% (85 runs sampled)
native - map 1x over array x 74,172 ops/sec ±1.40% (88 runs sampled)
imlazy - map 2x over array x 7,989 ops/sec ±0.83% (87 runs sampled)
native - map 2x over array x 33,745 ops/sec ±1.29% (87 runs sampled)
imlazy - map 3x over array x 7,159 ops/sec ±1.03% (84 runs sampled)
native - map 3x over array x 23,318 ops/sec ±0.71% (88 runs sampled)
```

`benchmarks/transducers-and-native.js` (two filter operations and two map operations)
```sh
imlazy - infinite iterable x 1,245 ops/sec ±1.16% (82 runs sampled)
transducer - infinite iterable x 2,079 ops/sec ±1.15% (85 runs sampled)
imlazy - array x 14,490 ops/sec ±2.10% (82 runs sampled)
transducer - array x 26,151 ops/sec ±0.74% (91 runs sampled)
native - array x 24,186 ops/sec ±0.76% (88 runs sampled)
```

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
