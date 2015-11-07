import test from 'tape';
import {filter, find, map, makeCircular, nth, range, take} from './';

const oneTwoThree = Object.freeze([1, 2, 3]);
const positiveIntegers = range(1)(Infinity);

test('range', t => {
    t.deepEquals([...range(1)(3)],
                 oneTwoThree);
    t.end();
});

test('map', t => {
    t.deepEquals([...map(x => x / 2)([2, 4, 6])],
                 oneTwoThree);
    t.end();
});

test('take', t => {
    t.deepEquals([...take(3)([1, 2, 3, 4])],
                 oneTwoThree);
    t.deepEquals([...take(3)(positiveIntegers)],
                 oneTwoThree);
    t.end();
});

test('take map', t => {
    t.deepEquals([...map(x => x * 2)(take(3)(positiveIntegers))],
                 [2, 4, 6]);
    t.end();
});

test('map take', t => {
    t.deepEquals([...take(3)(map(x => x * 2)(positiveIntegers))],
                 [2, 4, 6]);
    t.end();
});

test('nth', t => {
    t.deepEquals(nth(0)(positiveIntegers),
                 1);
    t.deepEquals(nth(1)(positiveIntegers),
                 2);
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

test('filter', t => {
    t.deepEquals([...filter(x => x <= 3)(range(1)(100))],
                 oneTwoThree);
    t.end();
});

test('take makeCircular', t => {
    t.deepEquals([...take(8)(makeCircular(range(1)(3)))],
                 [1, 2, 3, 1, 2, 3, 1, 2]);
    t.end();
});
