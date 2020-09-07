import { Test } from "@anderjason/tests";
import { Size3 } from ".";

Test.define("Size3 can be adjusted to fit a larger bounding box", () => {
  const original = Size3.givenWidthHeightDepth(100, 200, 150);
  const bounds = Size3.givenWidthHeightDepth(1000, 1000, 1000);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size3.givenWidthHeightDepth(500, 1000, 750);

  Test.assert(actual.isEqual(expected));
});

Test.define("Size3 can be adjusted to fit a smaller bounding box", () => {
  const original = Size3.givenWidthHeightDepth(100, 200, 150);
  const bounds = Size3.givenWidthHeightDepth(10, 10, 10);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size3.givenWidthHeightDepth(5, 10, 7.5);

  Test.assert(actual.isEqual(expected));
});

Test.define(
  "Size3 can be adjusted to fit a larger bounding box without expanding",
  () => {
    const original = Size3.givenWidthHeightDepth(100, 200, 150);
    const bounds = Size3.givenWidthHeightDepth(1000, 1000, 1000);

    const actual = original.withAvailableSize(bounds, "shrink");
    const expected = Size3.givenWidthHeightDepth(100, 200, 150);

    Test.assert(actual.isEqual(expected));
  }
);

Test.define("Size3 can be adjusted to fit a zero size bounding box", () => {
  const original = Size3.givenWidthHeightDepth(100, 200, 150);
  const bounds = Size3.givenWidthHeightDepth(0, 0, 0);

  const actual = original.withAvailableSize(bounds, "flexible");
  const expected = Size3.ofZero();

  Test.assert(actual.isEqual(expected));
});
