import test from 'tape';
import {concat,
        every,
        filter,
        find,
        findIndex,
        iterableFrom,
        iterableOf,
        length,
        map,
        makeCircular,
        nth,
        range,
        reduce,
        repeat,
        reverse,
        slice,
        some,
        sort,
        take,
        zip} from './';

const oneTwoThree = Object.freeze([1, 2, 3]);
const threeTwoOne = Object.freeze([3, 2, 1]);
const oneTwoThreeFour = Object.freeze([1, 2, 3, 4]);
const fourThreeTwoOne = Object.freeze([4, 3, 2, 1]);
const fiveFiveFive = Object.freeze([5, 5, 5]);
const positiveIntegers = range(1)(Infinity);
const negativeIntegers = range(-1)(-Infinity);

const add = a => b => a + b;
const double = x => x * 2;
const halve = x => x / 2;

test('concat', t => {
  t.deepEquals([...concat(oneTwoThree)(threeTwoOne)],
               [1, 2, 3, 3, 2, 1]);
  t.deepEquals([...take(8)(concat(oneTwoThree)(negativeIntegers))],
               [1, 2, 3, -1, -2, -3, -4, -5]);
  t.deepEquals([...take(8)(concat(negativeIntegers)(oneTwoThree))],
               [-1, -2, -3, -4, -5, -6, -7, -8]);
  t.deepEquals([...take(8)(concat(negativeIntegers)(negativeIntegers))],
               [-1, -2, -3, -4, -5, -6, -7, -8]);
  t.end();
});

test('every', t => {
  t.deepEquals(every(x => x === 5)(fiveFiveFive),
               true);
  t.deepEquals(every(x => x === 30)(fiveFiveFive),
               false);
  t.end();
});

test('filter', t => {
  t.deepEquals([...filter(x => x <= 3)(range(1)(100))],
               oneTwoThree);
  t.end();
});

test('find', t => {
  t.deepEquals(find(x => x === 1)(positiveIntegers),
               1);
  t.deepEquals(find(x => x === 3)(positiveIntegers),
               3);
  t.deepEquals(find(x => x === 4)(oneTwoThree),
               undefined);
  t.end();
});

test('findIndex', t => {
  t.deepEquals(findIndex(x => x === -1)(negativeIntegers),
               0);
  t.deepEquals(findIndex(x => x === -30)(negativeIntegers),
               29);
  t.deepEquals(findIndex(x => x === -4)(oneTwoThree),
               undefined);
  t.end();
});

test('iterableFrom', t => {
  t.deepEquals([...iterableFrom(oneTwoThree)],
              oneTwoThree);
  t.end();
});

test('iterableOf', t => {
  t.deepEquals([...iterableOf(1, 2, 3)],
              oneTwoThree);
  t.end();
});

test('length', t => {
  t.deepEquals(length(oneTwoThree),
               3);
  t.end();
});

test('makeCircular', t => {
  t.deepEquals([...take(8)(makeCircular(range(1)(3)))],
               [1, 2, 3, 1, 2, 3, 1, 2]);
  t.end();
});

test('map', t => {
  t.deepEquals([...map(halve)([2, 4, 6])],
               oneTwoThree);
  t.end();
});

test('nth', t => {
  t.deepEquals(nth(0)(positiveIntegers),
               1);
  t.deepEquals(nth(1)(positiveIntegers),
               2);
  t.end();
});

test('range', t => {
  t.deepEquals([...range(1)(1)],
               [1]);
  t.deepEquals([...range(1)(3)],
               oneTwoThree);
  t.deepEquals([...range(3)(1)],
               threeTwoOne);
  t.end();
});

test('reduce', t => {
  t.deepEquals(reduce(add)(0)(oneTwoThree),
               6);
  t.end();
});

test('repeat', t => {
  t.deepEquals([...repeat(5)(3)],
               fiveFiveFive);
  t.deepEquals([...take(3)(repeat(5)(Infinity))],
               fiveFiveFive);
  t.end();
});

test('reverse', t => {
  t.deepEquals([...reverse(oneTwoThree)],
               threeTwoOne);
  t.end();
});

test('slice', t => {
  t.deepEquals([...slice(0)(4)(oneTwoThreeFour)],
               oneTwoThree);
  t.deepEquals([...slice(1)(2)(oneTwoThree)],
               [2]);
  t.deepEquals([...slice(1)(1)(oneTwoThree)],
               []);
  t.deepEquals([...slice(0)(4)(positiveIntegers)],
               oneTwoThree);
  t.deepEquals([...slice(0)(4)(slice(0)(Infinity)(positiveIntegers))],
               oneTwoThree);
  t.end();
});

test('some', t => {
  t.deepEquals(some(x => x === 30)(positiveIntegers),
               true);
  t.deepEquals(some(x => x === 30)(oneTwoThree),
               false);
  t.end();
});

test('sort', t => {
  t.deepEquals([...sort(a => b => a > b)(oneTwoThreeFour)],
               oneTwoThreeFour);
  t.deepEquals([...sort(a => b => a < b)(oneTwoThreeFour)],
               fourThreeTwoOne);
  t.end();
});

test('take', t => {
  t.deepEquals([...take(3)(oneTwoThreeFour)],
               oneTwoThree);
  t.deepEquals([...take(3)(positiveIntegers)],
               oneTwoThree);
  t.deepEquals([...take(3)(map(double)(positiveIntegers))],
               [2, 4, 6]);
  t.deepEquals([...map(double)(take(3)(positiveIntegers))],
               [2, 4, 6]);
  t.end();
});

test('zip', t => {
  t.deepEquals([...zip(oneTwoThree)(threeTwoOne)].map(xs => [...xs]),
               [[1, 3], [2, 2], [3, 1]]);
  t.deepEquals([...zip(oneTwoThreeFour)(threeTwoOne)].map(xs => [...xs]),
               [[1, 3], [2, 2], [3, 1]]);
  t.deepEquals([...zip(threeTwoOne)(positiveIntegers)].map(xs => [...xs]),
               [[3, 1], [2, 2], [1, 3]]);
  t.deepEquals([...take(3)(zip(positiveIntegers)(positiveIntegers))].map(xs => [...xs]),
               [[1, 1], [2, 2], [3, 3]]);
  t.end();
});
