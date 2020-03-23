const test = require("tape");
const { chain, of } = require("../");
const {
  testAndToArray,
  oneTwoThree,
  positiveIntegers,
  takeEight,
} = require("./_tools");

test("chain", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(processIterable(chain((x) => of(x, x), oneTwoThree)), [
    1,
    1,
    2,
    2,
    3,
    3,
  ]);
  t.end();
});

test("chain", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(
    processIterable(takeEight(chain((x) => of(x, x), positiveIntegers))),
    [1, 1, 2, 2, 3, 3, 4, 4]
  );
  t.end();
});
