# imlazy
Laziness is next to Godliness

## What is this?

JS utility library, for dealing with iterables, iterators and generators.

Functional, declarative, immutable and lazy as you like.

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them as detailed below.

Iterables returned by imlazy are simpy of the form:

```javascript

const someIterable = {[Symbol.Iterator]: function* () {
  // do some stuff
}};

```

Therefore they are lazy and immutable.

If you want to turn them into arrays or feed them into a function etc then just spread them:

```javascript

const someArray = [...someIterable];
const someReturnedValue = someFunction(...someIterable);

```

## API

### create

- range
- repeat

### "transform" (mutation free)

- filter
- makeCircular
- map
- reduce
- reverse
- take
- zip

### query

- findIndex
- find
- length
- nth
- some
