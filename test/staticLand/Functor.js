const test = require("tape");
const { equals, map, of } = require("../../");

const f = (x) => x + "f";
const g = (x) => x + "g";
const a = of("value");

test("Functor", (t) => {
  t.true(
    equals(
      map((x) => x, a),
      a,
    ),
    "Identity",
  );
  t.true(
    equals(
      map((x) => f(g(x)), a),
      map(f, map(g, a)),
    ),
    "Composition",
  );
  t.deepEqual([...map((x) => f(g(x)), a)], ["valuegf"], "Composition");
  t.deepEqual([...map(f, map(g, a))], ["valuegf"], "Composition");
  t.end();
});
