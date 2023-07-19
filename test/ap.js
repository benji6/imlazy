const test = require("tape");
const { ap, of, repeat } = require("../");
const {
  oneTwoThree,
  positiveIntegers,
  takeEight,
  testAndToArray,
} = require("./_tools");

test("ap", (t) => {
  const processIterable = testAndToArray(t);

  t.deepEqual(
    processIterable(
      ap(
        of(
          (x) => x * 2,
          (x) => x + 3,
        ),
        oneTwoThree,
      ),
    ),
    [2, 4, 6, 4, 5, 6],
  );

  t.deepEqual(
    processIterable(
      takeEight(
        ap(
          of(
            (x) => x * 2,
            (x) => x + 3,
          ),
          positiveIntegers,
        ),
      ),
    ),
    [2, 4, 6, 8, 10, 12, 14, 16],
  );

  t.deepEqual(
    processIterable(
      takeEight(
        ap(
          repeat((x) => x * 2),
          oneTwoThree,
        ),
      ),
    ),
    [2, 4, 6, 2, 4, 6, 2, 4],
  );

  t.deepEqual(
    processIterable(
      takeEight(
        ap(
          repeat((x) => x * 2),
          positiveIntegers,
        ),
      ),
    ),
    [2, 4, 6, 8, 10, 12, 14, 16],
  );
  t.end();
});
