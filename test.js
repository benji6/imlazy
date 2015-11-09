import test from 'tape';
import {concat,
        every,
        filter,
        find,
        findIndex,
        flatten,
        iterableFrom,
        iterableOf,
        length,
        makeCircular,
        map,
        nth,
        range,
        reduce,
        repeat,
        reverse,
        slice,
        some,
        sort,
        take,
        takeWhile,
        zip,
        zipWith} from './';

const oneTwoThree = Object.freeze([1, 2, 3]);
const threeTwoOne = Object.freeze([3, 2, 1]);
const oneTwoThreeFour = Object.freeze([1, 2, 3, 4]);
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1]);
const fiveFiveFive = Object.freeze([5, 5, 5]);
const positiveIntegers = range(1)(Infinity);
const negativeIntegers = range(-1)(-Infinity);

const add = a => b => a + b;
const subtract = a => b => a - b;
const double = x => x * 2;
const halve = x => x / 2;
const takeThree = take(3);
const takeEight = take(8);

const B = a => b => c => a(b(c));

const isFrozen = t => iterable => (t.throws(() => iterable.a = 1), iterable);
const toArray = iterable => [...iterable];
const isFrozenToArray = t => B(toArray)(isFrozen(t));

const syncTest = (name, f) => test(name, t => {
  f(t);
  t.end();
});

syncTest('concat', t => {
  const concatOneTwoThree = concat(oneTwoThree);
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(concatOneTwoThree(threeTwoOne)),
               [1, 2, 3, 3, 2, 1]);
  t.deepEquals(processIterable(takeEight(concatOneTwoThree(negativeIntegers))),
               [1, 2, 3, -1, -2, -3, -4, -5]);
  t.deepEquals(processIterable(takeEight(concat(negativeIntegers)(oneTwoThree))),
               [-1, -2, -3, -4, -5, -6, -7, -8]);
  t.deepEquals(processIterable(takeEight(concat(negativeIntegers)(negativeIntegers))),
               [-1, -2, -3, -4, -5, -6, -7, -8]);
});

syncTest('every', t => {
  t.deepEquals(every(x => x === 5)(fiveFiveFive),
               true);
  t.deepEquals(every(x => x === 30)(fiveFiveFive),
               false);
});

syncTest('filter', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(filter(x => x <= 3)(range(1)(100))),
               oneTwoThree);
});

syncTest('find', t => {
  t.deepEquals(find(x => x === 1)(positiveIntegers),
               1);
  t.deepEquals(find(x => x === 3)(positiveIntegers),
               3);
  t.deepEquals(find(x => x === 4)(oneTwoThree),
               undefined);
});

syncTest('findIndex', t => {
  t.deepEquals(findIndex(x => x === -1)(negativeIntegers),
               0);
  t.deepEquals(findIndex(x => x === -30)(negativeIntegers),
               29);
  t.deepEquals(findIndex(x => x === -4)(oneTwoThree),
               undefined);
});

syncTest('flatten', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(flatten([oneTwoThree, threeTwoOne, oneTwoThreeFour])),
               [...oneTwoThree, ...threeTwoOne, ...oneTwoThreeFour]);
  t.deepEquals(processIterable(takeEight(flatten([oneTwoThree, positiveIntegers]))),
               [...oneTwoThree, ...oneTwoThreeFour, 5]);
  t.deepEquals(processIterable(takeEight(flatten(repeat(positiveIntegers)(Infinity)))),
               [1, 2, 3, 4, 5, 6, 7, 8]);
});

syncTest('iterableFrom', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(iterableFrom(oneTwoThree)),
               oneTwoThree);
});

syncTest('iterableOf', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(iterableOf(1, 2, 3)),
               oneTwoThree);
});

syncTest('length', t => {
  t.deepEquals(length(oneTwoThree),
               3);
});

syncTest('makeCircular', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(takeEight(makeCircular(range(1)(3)))),
               [1, 2, 3, 1, 2, 3, 1, 2]);
});

syncTest('map', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(map(halve)([2, 4, 6])),
               oneTwoThree);
});

syncTest('nth', t => {
  const second = nth(1);
  t.deepEquals(nth(0)(positiveIntegers),
               1);
  t.deepEquals(second(positiveIntegers),
               2);
  t.deepEquals(second(negativeIntegers),
               -2);
});

syncTest('range', t => {
  const rangeFromThree = range(3);
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(range(1)(1)),
               [1]);
  t.deepEquals(processIterable(range(1)(3)),
               oneTwoThree);
  t.deepEquals(processIterable(rangeFromThree(1)),
               threeTwoOne);
  t.deepEquals(processIterable(rangeFromThree(1)),
               threeTwoOne);
});

syncTest('reduce', t => {
  const sum = reduce(add)(0);
  t.deepEquals(sum(oneTwoThree),
               6);
  t.deepEquals(sum(oneTwoThreeFour),
               10);
});

syncTest('repeat', t => {
  const processIterable = isFrozenToArray(t);
  const repeatFive = repeat(5);
  t.deepEquals(processIterable(repeatFive(3)),
               fiveFiveFive);
  t.deepEquals(processIterable(repeatFive(3)),
               fiveFiveFive);
  t.deepEquals(processIterable(takeThree(repeat(5)(Infinity))),
               fiveFiveFive);
});

syncTest('reverse', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(reverse(oneTwoThree)),
               threeTwoOne);
});

syncTest('slice', t => {
  const sliceFromZero = slice(0);
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(sliceFromZero(4)(oneTwoThreeFour)),
               oneTwoThree);
  t.deepEquals(processIterable(slice(1)(2)(oneTwoThree)),
               [2]);
  t.deepEquals(processIterable(slice(1)(1)(oneTwoThree)),
               []);
  t.deepEquals(processIterable(sliceFromZero(4)(positiveIntegers)),
               oneTwoThree);
  t.deepEquals(processIterable(sliceFromZero(4)(slice(0)(Infinity)(positiveIntegers))),
               oneTwoThree);
});

syncTest('some', t => {
  t.deepEquals(some(x => x === 30)(positiveIntegers),
               true);
  t.deepEquals(some(x => x === 30)(oneTwoThree),
               false);
});

syncTest('sort', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(sort(a => b => a > b)(oneTwoThreeFour)),
               oneTwoThreeFour);
  t.deepEquals(processIterable(sort(a => b => a < b)(oneTwoThreeFour)),
               fourThreeTwoOne);
});

syncTest('take', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(takeThree(oneTwoThreeFour)),
               oneTwoThree);
  t.deepEquals(processIterable(takeThree(positiveIntegers)),
               oneTwoThree);
  t.deepEquals(processIterable(takeThree(map(double)(positiveIntegers))),
               [2, 4, 6]);
  t.deepEquals(processIterable(map(double)(takeThree(positiveIntegers))),
               [2, 4, 6]);
});

syncTest('takeWhile', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(takeWhile(a => a !== 5)(oneTwoThreeFour)),
               oneTwoThreeFour);
  t.deepEquals(processIterable(takeWhile(a => a !== 4)(oneTwoThreeFour)),
               oneTwoThree);
  t.deepEquals(processIterable(takeWhile(a => a !== 4)(positiveIntegers)),
               oneTwoThree);
});

syncTest('zip', t => {
  const processIterable = isFrozenToArray(t);
  t.deepEquals(processIterable(zip(oneTwoThree)(threeTwoOne)).map(processIterable),
               [[1, 3], [2, 2], [3, 1]]);
  t.deepEquals(processIterable(zip(oneTwoThreeFour)(threeTwoOne)).map(processIterable),
               [[1, 3], [2, 2], [3, 1]]);
  t.deepEquals(processIterable(zip(threeTwoOne)(positiveIntegers)).map(processIterable),
               [[3, 1], [2, 2], [1, 3]]);
  t.deepEquals(processIterable(takeThree(zip(positiveIntegers)(positiveIntegers))).map(processIterable),
               [[1, 1], [2, 2], [3, 3]]);
});

syncTest('zipWith', t => {
  const processIterable = isFrozenToArray(t);
  const zipWithSubtract = zipWith(subtract);
  t.deepEquals(processIterable(zipWithSubtract(oneTwoThree)(threeTwoOne)),
               [-2, 0, 2]);
  t.deepEquals(processIterable(zipWithSubtract(oneTwoThreeFour)(threeTwoOne)),
               [-2, 0, 2]);
  t.deepEquals(processIterable(zipWithSubtract(threeTwoOne)(positiveIntegers)),
               [2, 0, -2]);
  t.deepEquals(processIterable(takeThree(zipWith(add)(positiveIntegers)(positiveIntegers))),
               [2, 4, 6]);
});
