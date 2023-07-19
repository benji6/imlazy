const test = require("tape");
const imlazy = require("../..");
const { equals, of, traverse } = imlazy;

const a = of(of("foo", "bar", "baz"));
const f = (a) => a;

test("Traversable", (t) => {
  t.true(
    equals(f(traverse(imlazy, (a) => a, a)), traverse(imlazy, f, a)),
    "Naturality",
  );
  t.true(equals(traverse(imlazy, of, a), of(a)), "Identity");
  t.end();
});
