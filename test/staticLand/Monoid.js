const test = require("tape");
const { concat, empty, equals, of } = require("../../");

const a = of("foo");

test("Monoid", (t) => {
  t.true(equals(concat(a, empty()), a), "Right identity");
  t.true(equals(concat(empty(), a), a), "Left identity");
  t.end();
});
