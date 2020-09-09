import { Test } from "@anderjason/tests";
import { Point2 } from ".";

Test.define("Point2 can be created from coordinates", () => {
  const point = Point2.givenXY(5, 6);

  Test.assert(point.x === 5);
  Test.assert(point.y === 6);
});

Test.define("Point2 can calculate distance", () => {
  const a = Point2.givenXY(10, 12);
  const b = Point2.givenXY(45, 35);

  const actual = a.toDistance(b);
  const expected = 41.88;

  Test.assert(Math.abs(actual - expected) < 0.1);
});
