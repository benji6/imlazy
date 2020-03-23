const test = require("tape");
const { reject, range, take } = require("../");
const { testAndToArray } = require("./_tools");

test("reject", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(
    processIterable(
      take(
        3,
        reject((x) => x <= 3, range(1, Infinity))
      )
    ),
    [4, 5, 6]
  );
  t.end();
});
