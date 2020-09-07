import { Test } from "@anderjason/tests";
import { MutablePoint3 } from "./index";
import { Point3 } from "../Point3";

Test.define(
  "MutablePoint3 can read values that were set in the constructor",
  () => {
    const mp = MutablePoint3.givenXYZ(5, 8, 4);
    Test.assert(mp.x === 5);
    Test.assert(mp.y === 8);
    Test.assert(mp.z === 4);
  }
);

Test.define("MutablePoint3 can set values and read them back", () => {
  const mp = MutablePoint3.givenXYZ(5, 8, 4);
  mp.x = 50;
  mp.y = 80;
  mp.z = 40;

  Test.assert(mp.x === 50);
  Test.assert(mp.y === 80);
  Test.assert(mp.z === 40);
});

Test.define("MutablePoint3 can be used where a Point3 is expected", () => {
  const expectsPoint = (point: Point3): boolean => {
    return point.x === 50 && point.y === 80 && point.z === 40;
  };

  const mp = MutablePoint3.givenXYZ(5, 8, 4);
  mp.x = 50;
  mp.y = 80;
  mp.z = 40;

  Test.assert(expectsPoint(mp));
});

Test.define(
  "MutablePoint3 can be checked for equality with another MutablePoint3",
  () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = MutablePoint3.givenXYZ(5, 8, 4);

    Test.assert(first.isEqual(second));
  }
);

Test.define(
  "MutablePoint3 is not equal to a MutablePoint3 if the values are different",
  () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = MutablePoint3.givenXYZ(50, 80, 40);

    Test.assert(!first.isEqual(second));
  }
);

Test.define("MutablePoint3 can be checked for equality with a Point3", () => {
  const first = MutablePoint3.givenXYZ(5, 8, 4);
  const second = Point3.givenXYZ(5, 8, 4);

  Test.assert(first.isEqual(second));
});

Test.define(
  "MutablePoint3 is not equal to a Point3 if the values are different",
  () => {
    const first = MutablePoint3.givenXYZ(5, 8, 4);
    const second = Point3.givenXYZ(50, 80, 40);

    Test.assert(!first.isEqual(second));
  }
);

Test.define("MutablePoint3 is zero if the values are all zero", () => {
  const first = MutablePoint3.givenXYZ(0, 0, 0);

  Test.assert(first.isZero);
});

Test.define(
  "MutablePoint3 is not zero if any of the values are not zero",
  () => {
    Test.assert(!MutablePoint3.givenXYZ(0, 0, 1).isZero);
    Test.assert(!MutablePoint3.givenXYZ(0, 1, 0).isZero);
    Test.assert(!MutablePoint3.givenXYZ(1, 0, 0).isZero);
  }
);

Test.define("MutablePoint3 is not zero if the values are undefined", () => {
  Test.assert(!MutablePoint3.givenXYZ(undefined, undefined, undefined).isZero);
});
