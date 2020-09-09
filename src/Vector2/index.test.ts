import { Test } from "@anderjason/tests";
import { Vector2 } from ".";
import { Rotation } from "../Rotation";

Test.define("Vector2 can calculate the magnitude of a vector", () => {
  const vector = Vector2.givenXY(1, 5);

  const actual = vector.toMagnitude();
  const expected = 5.1;

  Test.assert(Math.abs(actual - expected) < 0.01);
});

Test.define("Vector2 can normalize a vector", () => {
  const vector = Vector2.givenXY(1, 5);

  const actual = vector.withNormalizedMagnitude().toMagnitude();
  const expected = 1;

  Test.assert(Math.abs(actual - expected) < 0.01);
});

Test.define("Vector2 can calculate the angle between two vectors", () => {
  const a = Vector2.givenXY(5, -2);
  const b = Vector2.givenXY(-4, 5);

  const actual = a.toAngle(b).toRadians();
  const expected = 2.62;

  Test.assert(Math.abs(actual - expected) < 0.01);
});

Test.define("Vector2 can calculate a perpendicular vector", () => {
  const input = Vector2.givenXY(5, -10);

  const actualClockwise = input.withPerpendicularDirection("clockwise");
  const expectedClockwise = Vector2.givenXY(-10, -5);

  Test.assert(actualClockwise.isEqual(expectedClockwise));

  const actualCounterClockwise = input.withPerpendicularDirection(
    "counterclockwise"
  );
  const expectedCounterClockwise = Vector2.givenXY(10, 5);

  Test.assert(actualCounterClockwise.isEqual(expectedCounterClockwise));
});

Test.define("Vector2 can rotate", () => {
  const input = Vector2.givenXY(5, -10);

  const actualClockwise = input.withRotation(
    Rotation.givenDegrees(90),
    "clockwise"
  );

  const actualX = actualClockwise.x;
  const actualY = actualClockwise.y;

  const expectedX = -10;
  const expectedY = -5;

  Test.assert(Math.abs(actualX - expectedX) < 0.01);
  Test.assert(Math.abs(actualY - expectedY) < 0.01);
});
