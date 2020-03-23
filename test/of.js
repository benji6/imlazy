const test = require("tape");
const { of } = require("../");
const { testAndToArray, oneTwoThree } = require("./_tools");

test("of", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(processIterable(of(1, 2, 3)), oneTwoThree);
  t.end();
});
