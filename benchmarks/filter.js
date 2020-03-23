"use strict";

const assert = require("assert");
const Benchmark = require("benchmark");
const I = require("../");

const length = 1024;
const testArray = [...Array(length).keys()];

const divisibleBy2 = (x) => x % 2 === 0;
const divisibleBy3 = (x) => x % 3 === 0;
const divisibleBy5 = (x) => x % 5 === 0;

const imlazyOnceBenchmark = (xs) => [...I.filter(divisibleBy2, xs)];

const nativeOnceBenchmark = (xs) => xs.filter(divisibleBy2);

const imlazyTwiceBenchmark = (xs) => [
  ...I.filter(divisibleBy3, I.filter(divisibleBy2, xs)),
];

const nativeTwiceBenchmark = (xs) =>
  xs.filter(divisibleBy2).filter(divisibleBy3);

const imlazyThriceBenchmark = (xs) => [
  ...I.filter(divisibleBy5, I.filter(divisibleBy3, I.filter(divisibleBy2, xs))),
];

const nativeThriceBenchmark = (xs) =>
  xs.filter(divisibleBy2).filter(divisibleBy3).filter(divisibleBy5);

assert.deepEqual(
  imlazyOnceBenchmark(testArray),
  nativeOnceBenchmark(testArray)
);
assert.deepEqual(
  imlazyTwiceBenchmark(testArray),
  nativeTwiceBenchmark(testArray)
);
assert.deepEqual(
  imlazyThriceBenchmark(testArray),
  nativeThriceBenchmark(testArray)
);

new Benchmark.Suite()
  .add("imlazy - filter 1x over array", () => {
    imlazyOnceBenchmark(testArray);
  })
  .add("native - filter 1x over array", () => {
    nativeOnceBenchmark(testArray);
  })
  .add("imlazy - filter 2x over array", () => {
    imlazyTwiceBenchmark(testArray);
  })
  .add("native - filter 2x over array", () => {
    nativeTwiceBenchmark(testArray);
  })
  .add("imlazy - filter 3x over array", () => {
    imlazyThriceBenchmark(testArray);
  })
  .add("native - filter 3x over array", () => {
    nativeThriceBenchmark(testArray);
  })
  .on("cycle", (x) => process.stdout.write(`${String(x.target)}\n`))
  .on("complete", function () {
    process.stdout.write(
      `Fastest is ${this.filter("fastest").filter("name")}\n`
    );
  })
  .run({ async: true });
