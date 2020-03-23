const test = require("tape");
const { partition } = require("../");
const { isEven, testAndToArray, oneTwoThreeFour } = require("./_tools");

test("partition", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(
    processIterable(partition(isEven)(oneTwoThreeFour)).map(processIterable),
    [
      [2, 4],
      [1, 3],
    ]
  );
  t.deepEqual(
    processIterable(partition(isEven, oneTwoThreeFour)).map(processIterable),
    [
      [2, 4],
      [1, 3],
    ]
  );
  t.end();
});
