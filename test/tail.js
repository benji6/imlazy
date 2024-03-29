const test = require("tape");
const { tail } = require("../");
const { testAndToArray, positiveIntegers, takeEight } = require("./_tools");

test("tail", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(processIterable(tail([])), []);
  const tailPositiveIntegers = tail(positiveIntegers);
  t.deepEqual(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9],
  );
  t.deepEqual(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9],
  );
  t.deepEqual(
    processIterable(takeEight(tailPositiveIntegers)),
    [2, 3, 4, 5, 6, 7, 8, 9],
  );
  t.end();
});
