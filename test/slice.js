const test = require("tape");
const { slice } = require("../");
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  throwOnThird,
} = require("./_tools");

test("slice", (t) => {
  const sliceFromZero = slice(0);
  const processIterable = testAndToArray(t);
  const twoThree = slice(1)(20)(oneTwoThree);
  t.deepEqual(processIterable(sliceFromZero(3)(oneTwoThreeFour)), oneTwoThree);
  t.deepEqual(processIterable(slice(1)(2)(oneTwoThree)), [2]);
  t.deepEqual(processIterable(twoThree), [2, 3]);
  t.deepEqual(processIterable(twoThree), [2, 3]);
  t.deepEqual(processIterable(twoThree), [2, 3]);
  t.deepEqual(processIterable(slice(1)(1)(oneTwoThree)), []);
  t.deepEqual(processIterable(slice(20)(100)(oneTwoThree)), []);
  t.deepEqual(processIterable(slice(0)(3)(positiveIntegers)), [1, 2, 3]);
  t.deepEqual(processIterable(slice(3)(6)(positiveIntegers)), [4, 5, 6]);
  t.deepEqual(
    processIterable(slice(40)(45)(positiveIntegers)),
    [41, 42, 43, 44, 45],
  );
  t.deepEqual(
    processIterable(sliceFromZero(3)(slice(0, Infinity, positiveIntegers))),
    oneTwoThree,
  );
  t.deepEqual(processIterable(slice(2, 2, positiveIntegers)), []);
  t.deepEqual(processIterable(slice(2, 1, positiveIntegers)), []);
  t.deepEqual(processIterable(slice(Infinity, Infinity, positiveIntegers)), []);
  t.deepEqual(processIterable(slice(0, 2, throwOnThird)), [1, 2]);
  t.deepEqual(
    processIterable(slice(-1, 4, oneTwoThreeFour)),
    [4],
    "negative start index",
  );
  t.deepEqual(
    processIterable(slice(0, -1, oneTwoThreeFour)),
    [1, 2, 3],
    "negative end index",
  );
  t.deepEqual(
    processIterable(slice(-3, -2, oneTwoThreeFour)),
    [2],
    "negative indices",
  );
  t.deepEqual(
    processIterable(slice(-10, -2, oneTwoThreeFour)),
    [1, 2],
    "negative indices",
  );
  t.deepEqual(
    processIterable(slice(-3, -3, oneTwoThreeFour)),
    [],
    "equal negative indices",
  );
  t.deepEqual(
    processIterable(slice(-1, -2, positiveIntegers)),
    [],
    "when indices are negative and start index is greater return empty iterable",
  );
  t.end();
});
