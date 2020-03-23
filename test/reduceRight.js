const test = require("tape");
const { reduceRight } = require("../");
const { add, oneTwoThree, oneTwoThreeFour, subtract } = require("./_tools");

test("reduceRight", (t) => {
  const sum = reduceRight(add)(0);
  t.strictEqual(sum(oneTwoThree), 6);
  t.strictEqual(sum(oneTwoThreeFour), 10);
  t.strictEqual(reduceRight(add, 0, oneTwoThreeFour), 10);
  t.strictEqual(reduceRight(subtract, 0, oneTwoThreeFour), -2);
  t.strictEqual(
    reduceRight((val, acc) => acc + val, "a", ["e", "d", "c", "b"]),
    "abcde"
  );
  t.end();
});
