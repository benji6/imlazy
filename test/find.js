const test = require("tape");
const { find } = require("../");
const { oneTwoThree, positiveIntegers } = require("./_tools");

test("find", (t) => {
  t.deepEqual(find((x) => x === 1)(positiveIntegers), 1);
  t.deepEqual(find((x) => x === 3)(positiveIntegers), 3);
  t.deepEqual(
    find((x) => x === 4, oneTwoThree),
    undefined
  );
  t.end();
});
