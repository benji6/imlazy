const test = require("tape");
const { isEmpty, range } = require("../");

test("isEmpty", (t) => {
  t.is(isEmpty([]), true);
  t.is(isEmpty({ *[Symbol.iterator]() {} }), true);
  t.is(isEmpty([0]), false);
  t.is(isEmpty(range(1, Infinity)), false);
  t.end();
});
