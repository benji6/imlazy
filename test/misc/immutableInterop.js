const Immutable = require("immutable");
const { append } = require("../../");
const { testAndToArray, oneTwoThreeFour } = require("../_tools");
const test = require("tape");

test("immutable interop", (t) => {
  const processIterable = testAndToArray(t);
  const immutableOneTwoThree = Immutable.List.of(1, 2, 3);
  t.deepEqual(
    processIterable(append(4, immutableOneTwoThree)),
    oneTwoThreeFour,
  );
  t.end();
});
