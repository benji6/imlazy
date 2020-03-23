const test = require("tape");
const { sortBy } = require("../");
const { testAndToArray } = require("./_tools");

test("sort", (t) => {
  const processIterable = testAndToArray(t);
  t.deepEqual(
    processIterable(
      sortBy((a) => a[0])([
        [7, 2],
        [0, 1],
        [7, 5],
        [3, 8],
      ])
    ),
    [
      [0, 1],
      [3, 8],
      [7, 2],
      [7, 5],
    ]
  );
  t.deepEqual(
    processIterable(
      sortBy((x) => x.value, [
        { value: 7 },
        { value: 0 },
        { value: 7 },
        { value: 3 },
      ])
    ),
    [{ value: 0 }, { value: 3 }, { value: 7 }, { value: 7 }]
  );
  t.end();
});
