const test = require("tape");
const { _toString, map, zip } = require("../../");
const {
  emptyIterable,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
} = require("../_tools");

test("_toString", (t) => {
  t.is(_toString().name, "imlazyToStringThunk");
  t.is(_toString(emptyIterable)(), "()");
  t.is(_toString(oneTwoThree)(), "(1 2 3)");
  t.is(_toString(oneTwoThreeFour)(), "(1 2 3 4)");
  t.is(_toString(positiveIntegers)(), "(1 2 3 4 5 6 7 8 9 10...)");
  t.is(_toString(positiveIntegers)(), "(1 2 3 4 5 6 7 8 9 10...)");
  t.is(_toString(positiveIntegers)(), "(1 2 3 4 5 6 7 8 9 10...)");
  t.is(
    _toString(zip(positiveIntegers, positiveIntegers))(),
    "((1 1) (2 2) (3 3) (4 4) (5 5) (6 6) (7 7) (8 8) (9 9) (10 10)...)"
  );
  t.is(
    _toString(map(() => positiveIntegers, positiveIntegers))(),
    "((1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...) (1 2 3 4 5 6 7 8 9 10...)...)"
  );
  t.end();
});
