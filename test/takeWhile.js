const test = require("tape");
const { takeWhile } = require("../");
const {
  testAndToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
} = require("./_tools");

test("takeWhile", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(
    processIterable(takeWhile((a) => a !== 5)(oneTwoThreeFour)),
    oneTwoThreeFour
  );
  t.deepEqual(
    processIterable(takeWhile((a) => a !== 4)(oneTwoThreeFour)),
    oneTwoThree
  );
  t.deepEqual(
    processIterable(takeWhile((a) => a !== 4, positiveIntegers)),
    oneTwoThree
  );
  t.end();
});
