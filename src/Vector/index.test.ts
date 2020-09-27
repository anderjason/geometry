import { Test } from "@anderjason/tests";
import { Vector } from ".";
import { Matrix } from "../Matrix";

Test.define("Vector can be created", () => {
  const vec = new Vector([1, 2, 3, 4, 5]);

  const actual = vec.elements;
  const expected = [1, 2, 3, 4, 5];

  Test.assertIsDeepEqual(actual, expected);
});

Test.define("Vector can multiply by a matrix", () => {
  const matrix = Matrix.givenRows([
    [
      -0.005,
      -0.0016666666666666668,
      0,
      0.0016666666666666668,
      0.005,
      0.0016666666666666668,
      0,
      -0.0016666666666666668,
    ],
    [
      -0.0016666666666666668,
      0,
      0.0016666666666666668,
      0,
      -0.0016666666666666668,
      0,
      0.0016666666666666668,
      0,
    ],
    [1, -0, -0, -0, -0, -0, -0, -0],
    [0, -0.0025, 0, -0.0025, 0, 0.0025, 0, 0.0025],
    [
      -0.0025,
      -0.0033333333333333335,
      0.0025,
      0.0033333333333333335,
      0.0025,
      -0,
      -0.0025,
      -0,
    ],
    [-0, 1, -0, -0, -0, -0, -0, -0],
    [
      -0,
      -0.000016666666666666667,
      -0,
      0.000016666666666666667,
      -0,
      0.000016666666666666667,
      -0,
      -0.000016666666666666667,
    ],
    [
      -0.000016666666666666667,
      0,
      0.000016666666666666667,
      0,
      0.000016666666666666667,
      0,
      -0.000016666666666666667,
      0,
    ],
  ]);

  const vector = new Vector([-100, -150, -100, 150, 100, -150, 100, 150]);

  const actual = vector.withMultipliedMatrix(matrix).elements;
  const expected = [1, 0, -100, 0, 1, -150, 0, 0];

  Test.assertIsDeepEqual(actual, expected);
});
