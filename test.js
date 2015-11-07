import test from 'tape';
import {contains,
        filter,
        find,
        findIndex,
        length,
        map,
        makeCircular,
        nth,
        range,
        reduce,
        reverse,
        take} from './';

const oneTwoThree = Object.freeze([1, 2, 3]);
const threeTwoOne = Object.freeze([3, 2, 1]);
const positiveIntegers = range(1)(Infinity);
const negativeIntegers = range(-1)(-Infinity);

const add = a => b => a + b;
const double = x => x * 2;
const halve = x => x / 2;

test('contains', t => {
    t.deepEquals(contains(3)(oneTwoThree),
                 true);
    t.deepEquals(contains(1)(oneTwoThree),
                 true);
    t.deepEquals(contains(0)(oneTwoThree),
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

test('length', t => {
    t.deepEquals(length(oneTwoThree),
                 3);
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

test('reverse', t => {
    t.deepEquals([...reverse(oneTwoThree)],
                 threeTwoOne);
    t.end();
});

test('take', t => {
    t.deepEquals([...take(3)([1, 2, 3, 4])],
                 oneTwoThree);
    t.deepEquals([...take(3)(positiveIntegers)],
                 oneTwoThree);
    t.end();
});

test('map take', t => {
    t.deepEquals([...take(3)(map(double)(positiveIntegers))],
                 [2, 4, 6]);
    t.end();
});

test('take makeCircular', t => {
    t.deepEquals([...take(8)(makeCircular(range(1)(3)))],
                 [1, 2, 3, 1, 2, 3, 1, 2]);
    t.end();
});

test('take map', t => {
    t.deepEquals([...map(double)(take(3)(positiveIntegers))],
                 [2, 4, 6]);
    t.end();
});
