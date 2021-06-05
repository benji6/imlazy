const test = require("tape");
const { map, range, take } = require("../");
const { testAndToArray, oneTwoThree, threeTwoOne } = require("./_tools");

test("range", (t) => {
  const rangeFromThree = range(3);
  const processIterable = testAndToArray(t);
  const positiveIntegers = map((x) => x, range(1, Infinity));
  t.deepEqual(processIterable(range(1)(1)), [1]);
  t.deepEqual(processIterable(range(1, 3)), oneTwoThree);
  t.deepEqual(processIterable(range(1, 3)), oneTwoThree);
  t.deepEqual(
    processIterable(take(8, positiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  t.deepEqual(
    processIterable(take(8, positiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  t.deepEqual(
    processIterable(take(8, positiveIntegers)),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  t.deepEqual(processIterable(rangeFromThree(1)), threeTwoOne);
  t.deepEqual(processIterable(rangeFromThree(1)), threeTwoOne);
  t.end();
});
