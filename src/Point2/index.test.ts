import { Test } from "@anderjason/tests";
import { Point2 } from ".";

Test.define("Point2 can be created from coordinates", () => {
  const point = Point2.givenXY(5, 6);

  Test.assert(point.x === 5);
  Test.assert(point.y === 6);
});
