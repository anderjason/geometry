import { Test } from "@anderjason/tests";
import { Point2 } from ".";
import { Rotation } from "../Rotation";

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

Test.define("Point2 can rotate around a point", () => {
  const original = Point2.givenXY(68.07725689612602, 92.7787807756817);
  const center = Point2.givenXY(200, 200);
  const rotation = Rotation.givenDegrees(2566.695150000887);

  const expected = Point2.givenXY(187.54329240737576, 30.45699531991326);
  const actual = original.withRotationAroundPoint(rotation, center);

  Test.assert(actual.isEqual(expected));
});
