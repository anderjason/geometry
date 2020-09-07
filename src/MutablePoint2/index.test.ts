import { Test } from "@anderjason/tests";
import { MutablePoint2 } from "./index";
import { Point2 } from "../Point2";

Test.define(
  "MutablePoint2 can read values that were set in the constructor",
  () => {
    const mp = MutablePoint2.givenXY(5, 8);
    Test.assert(mp.x === 5);
    Test.assert(mp.y === 8);
  }
);

Test.define("MutablePoint2 can set values and read them back", () => {
  const mp = MutablePoint2.givenXY(5, 8);
  mp.x = 50;
  mp.y = 80;

  Test.assert(mp.x === 50);
  Test.assert(mp.y === 80);
});

Test.define("MutablePoint2 can be used where a Point2 is expected", () => {
  const expectsPoint = (point: Point2): boolean => {
    return point.x === 50 && point.y === 80;
  };

  const mp = MutablePoint2.givenXY(5, 8);
  mp.x = 50;
  mp.y = 80;

  Test.assert(expectsPoint(mp));
});

Test.define(
  "MutablePoint2 can be checked for equality with another MutablePoint2",
  () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = MutablePoint2.givenXY(5, 8);

    Test.assert(first.isEqual(second));
  }
);

Test.define(
  "MutablePoint2 is not equal to a MutablePoint2 if the values are different",
  () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = MutablePoint2.givenXY(50, 80);

    Test.assert(!first.isEqual(second));
  }
);

Test.define("MutablePoint2 can be checked for equality with a Point2", () => {
  const first = MutablePoint2.givenXY(5, 8);
  const second = Point2.givenXY(5, 8);

  Test.assert(first.isEqual(second));
});

Test.define(
  "MutablePoint2 is not equal to a Point2 if the values are different",
  () => {
    const first = MutablePoint2.givenXY(5, 8);
    const second = Point2.givenXY(50, 80);

    Test.assert(!first.isEqual(second));
  }
);

Test.define("MutablePoint2 is zero if the values are all zero", () => {
  const first = MutablePoint2.givenXY(0, 0);

  Test.assert(first.isZero);
});

Test.define(
  "MutablePoint2 is not zero if any of the values are not zero",
  () => {
    Test.assert(!MutablePoint2.givenXY(0, 1).isZero);
    Test.assert(!MutablePoint2.givenXY(1, 0).isZero);
  }
);

Test.define("MutablePoint2 is not zero if the values are undefined", () => {
  Test.assert(!MutablePoint2.givenXY(undefined, undefined).isZero);
});
